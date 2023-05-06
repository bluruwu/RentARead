from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from loginPage.models import Usuario, Libro, Transaccion

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

        # precio_venta = data[]
        # precio_renta = data[]

        return Response({'success': "Libro agregado"})
