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
        email = data['email']
        titulo = data["nombre_libro"]
        genero = data["genero_libro"]
        autor = data["nombre_autor"]
        editorial = data["editorial_libro"]
        isbn = data["codigo_ISBN"]
        ano_publicacion = data["fecha_libro"]
        numero_paginas = data["numero_paginas"]
        descripcion = data["descripcion_libro"]
        # venta=data[]
        # renta=data[]
        # intercambio=data[]
        # u  # so=data[]
        precio = data["otro_campo"]
        # precio_venta = data[]
        # precio_renta = data[]

        for usuario in Usuario.objects.all():
            if usuario.email == email:
                return Response({'success': "El nombre del usuario es: " + usuario.nombre})
            else:
                return Response({'error': "No hay usuarios con este email"})
