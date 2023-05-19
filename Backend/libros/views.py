from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from datetime import datetime, timedelta
from loginPage.models import Usuario, Libro, Transaccion
import base64

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


class RegistrarLibroView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        user = get_user(request)
        email = Usuario.objects.get(pk=user)

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

        # Imagen
        cadenab64 = data["file"]
        datos_base64 = cadenab64.split(",")[1]
        imagen_binaria = base64.b64decode(datos_base64)
        partes = str(email.email).split("@")
        nombre_usuario = partes[0] + "@" + partes[1].split(".")[0]
        nombre_imagen = str(titulo) + "-" + nombre_usuario + ".jpg"
        ruta_imagen = '../Frontend/public/static/librosMedia/' + nombre_imagen
        with open(ruta_imagen, 'wb') as archivo_imagen:
            archivo_imagen.write(imagen_binaria)

        # Final
        Libro.objects.create(titulo=titulo, genero=genero, autor=autor, editorial=editorial, isbn=isbn, ano_publicacion=ano_publicacion,
                             numero_paginas=numero_paginas, descripcion=descripcion, estado=estado, intercambio=intercambio, precio_renta=precio_renta, precio_venta=precio_venta, email=email, ruta_imagen=ruta_imagen)

        return Response({'success': "Libro agregado"})


class CatalogoLibrosView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):

        user = get_user(request)
        email = Usuario.objects.get(pk=user)
        print("--->", email)
        print("user", user)

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
                    {"idlibro": libro.id_libro, "titulo": libro.titulo, "genero": libro.genero, "autor": libro.autor, "uso": uso, "editorial": libro.editorial, "isbn": libro.isbn, "anoPublicacion": libro.ano_publicacion, "numeroPaginas": libro.numero_paginas, "descripcion": libro.descripcion, "precioVenta": libro.precio_venta, "precioRenta": libro.precio_renta, "intercambio": libro.intercambio, "estado": libro.estado, "vendedorNombre": libro.email.nombre, "vendedorId": libro.email.email, "vendedorCiudad": libro.email.ciudad, "lat": libro.email.latitud, "lng": libro.email.longitud})
        print(list(listadolibros))
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
        fecha = datetime.now().date()
        print(fecha)

        Transaccion.objects.create(id_comprador=id_comprador, id_libro=libro,
                                   tipo_transaccion=tipo_transaccion, fecha=fecha)

        # DATOS DE ENVIO
        titulo = Libro.objects.get(pk=id_libro).titulo
        direccion = Usuario.objects.get(pk=user).direccion
        mensaje = "Tu pago ha sido aprobado. \n'{}' llegará a tu dirección: {} en máximo 3 a 5 días hábiles".format(
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
        fecha_actual = datetime.now().date()

        print(user)
        Transaccion.objects.create(id_comprador=id_comprador, id_libro=libro,
                                   tipo_transaccion=tipo_transaccion, fecha=fecha_actual)

        # DATOS DE ENVIO
        titulo = Libro.objects.get(pk=id_libro).titulo
        direccion = Usuario.objects.get(pk=user).direccion
        fecha_devolucion = fecha_actual + timedelta(days=14)
        fecha_devolucion = fecha_devolucion.strftime("%d de %B de %Y")

        if libro.precio_renta > 0:
            mensaje = "Tu pago ha sido aprobado. \n '{}' llegará a tu dirección: {} en máximo 3 a 5 días hábiles. \nRecuerda regresarlo el día {}".format(
                titulo, direccion, fecha_devolucion)
        else:
            mensaje = "Renta realizada. \n '{}' llegará a tu dirección: {} en máximo 3 a 5 días hábiles. \nRecuerda regresarlo el día {}".format(
                titulo, direccion, fecha_devolucion)

        return Response({'success': mensaje})


class IntercambiarLibroView(APIView):
    pass


class PerfilVendedorView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        id_libro = data["id_libro"]
        vendedor = Libro.objects.get(pk=id_libro).email
        nombre = vendedor.nombre
        telefono = vendedor.telefono
        ciudad = vendedor.ciudad
        direccion = vendedor.direccion
        avatar = vendedor.avatar

        return Response({"nombre": nombre, "telefono": telefono, "ciudad": ciudad, "direccion": direccion, "avatar":avatar})
