from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from django.utils import timezone
from loginPage.models import Usuario, Libro, Transaccion

# OBTENER USUARIO ACTUAL CON LAS COOKIES


def get_user(request):

    session_id = request.COOKIES.get('sessionid')

    try:
        session = Session.objects.get(session_key=session_id)
        user_id = session.get_decoded().get('_auth_user_id')
        user = User.objects.get(pk=user_id)
    except (Session.DoesNotExist, User.DoesNotExist):
        user = None

    return user


"""
API-View de ejemplo, se le envia un email y responde con el nombre
Recordar al crear una View agregarla al archivo urls.py
"""


class PruebaView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        email = data['email']

        for usuario in Usuario.objects.all():
            if usuario.email == email:
                return Response({'success': "El nombre del usuario es: " + usuario.nombre})
            else:
                return Response({'error': "No hay usuarios con este email"})


class RegistrarLibroView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = Usuario.objects.get(pk=data['email'])

        titulo = data["nombre_libro"]
        numero_paginas = data["numero_paginas"]
        isbn = data["codigo_ISBN"]
        autor = data["nombre_autor"]
        genero = data["genero_libro"]
        estado = data["estado_libro"]
        editorial = data["editorial_libro"]
        ano_publicacion = data["fecha_libro"]
        uso = data["uso_libro"]
        descripcion = data["descripcion_libro"]
        precio_o_intercambio = data["otro_campo"]

        venta = None
        renta = None
        intercambio = None
        precio_venta = None
        precio_renta = None

        if uso == "Venta":
            intercambio = "No"
            precio_venta = precio_o_intercambio
        elif uso == "Renta":
            intercambio = "No"
            precio_renta = precio_o_intercambio
        elif uso == "Intercambio":
            intercambio = precio_o_intercambio

        Libro.objects.create(titulo=titulo, genero=genero, autor=autor, editorial=editorial, isbn=isbn, ano_publicacion=ano_publicacion,
                             numero_paginas=numero_paginas, descripcion=descripcion, estado=estado, intercambio=intercambio, precio_renta=precio_renta, precio_venta=precio_venta, email=email)

        return Response({'success': "Libro agregado"})


class CatalogoLibrosView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        user = get_user(request)
        email = Usuario.objects.get(pk=user)
        print("--->", email)

        listadolibros = []

        for libro in Libro.objects.all():
            # Verificar si no existe el Libro en Transaccion
            count = Transaccion.objects.filter(id_libro=libro).count()

            if libro.email != email and count == 0:
                uso = None
                if libro.precio_venta is not None:
                    uso = "Venta"
                elif libro.precio_renta is not None:
                    uso = "Renta"
                else:
                    uso = "Intercambio"

                listadolibros.append(
                    {"idlibro": libro.id_libro, "titulo": libro.titulo, "genero": libro.genero, "autor": libro.autor, "uso": uso, "editorial": libro.editorial, "isbn": libro.isbn, "ano_publicacion": libro.ano_publicacion, "numero_paginas": libro.numero_paginas, "descripcion": libro.descripcion, "precio_venta": libro.precio_venta, "precio_renta": libro.precio_renta, "intercambio": libro.intercambio, "estado": libro.estado, "vendedor_nombre": libro.email.nombre, "vendedor_id": libro.email.email, "vendedor_ciudad": libro.email.ciudad})

        return Response({'success': list(listadolibros)})


class ComprarLibroView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        user = get_user(request)

        # DATOS DE COMPRA
        id_comprador = Usuario.objects.get(pk=user)
        id_libro = data["id_libro"]
        tipo_transaccion = "Venta"
        libro = Libro.objects.get(pk=id_libro)
        monto_pagado = libro.precio_venta
        fecha = timezone.localdate()

        Transaccion.objects.create(id_comprador=id_comprador, id_libro=libro,
                                   tipo_transaccion=tipo_transaccion, fecha=fecha)

        # DATOS DE ENVIO
        titulo = Libro.objects.get(pk=id_libro).titulo
        direccion = Usuario.objects.get(pk=user).direccion
        mensaje = "Tu pago ha sido aprobado. {} llegará a tu dirección: {} en máximo 3 a 5 días hábiles".format(
            titulo, direccion)

        return Response({'success': mensaje})


class RentarLibroView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        user = get_user(request)

        # DATOS DE COMPRA
        id_comprador = Usuario.objects.get(pk=user)
        id_libro = data["id_libro"]
        tipo_transaccion = "Renta"
        libro = Libro.objects.get(pk=id_libro)
        fecha = timezone.localdate()

        print(user)
        Transaccion.objects.create(id_comprador=id_comprador, id_libro=libro,
                                   tipo_transaccion=tipo_transaccion, fecha=fecha)

        # DATOS DE ENVIO
        titulo = Libro.objects.get(pk=id_libro).titulo
        direccion = Usuario.objects.get(pk=user).direccion

        if libro.precio_renta > 0:
            mensaje = "Tu pago ha sido aprobado. {} llegará a tu dirección: {} en máximo 3 a 5 días hábiles".format(
                titulo, direccion)
        else:
            mensaje = "Renta realizada. {} llegará a tu dirección: {} en máximo 3 a 5 días hábiles".format(
                titulo, direccion)

        return Response({'success': mensaje})


class IntercambiarLibroView(APIView):
    pass
