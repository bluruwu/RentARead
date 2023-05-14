from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from loginPage.models import Usuario, Libro, Transaccion
import base64

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
        nombre_usuario = str(email.nombre)
        nombre_imagen = str(titulo) + "-" + nombre_usuario + ".jpg"
        ruta_imagen = 'media/'+ nombre_imagen
        with open(ruta_imagen, 'wb') as archivo_imagen:
            archivo_imagen.write(imagen_binaria)

        # Final
        Libro.objects.create(titulo=titulo, genero=genero, autor=autor, editorial=editorial, isbn=isbn, ano_publicacion=ano_publicacion,
                             numero_paginas=numero_paginas, descripcion=descripcion, estado=estado, intercambio=intercambio, precio_renta=precio_renta, precio_venta=precio_venta, email=email, ruta_imagen=ruta_imagen)

        return Response({'success': "Libro agregado"})


class CatalogoLibrosView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = Usuario.objects.get(pk=data['email'])
        print("--->", email)

        listadolibros = []

        for libro in Libro.objects.all():
            if libro.email != email:
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
