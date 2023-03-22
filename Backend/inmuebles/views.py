from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.core.mail import EmailMessage
from io import BytesIO
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from loginPage.models import Inmueble, Usuario, Factura, Tarifa, Publicidad, Pago, Bancoaliado
from reportlab.lib.pagesizes import A4
# from barcode import EAN13
import qrcode
from json.decoder import JSONDecodeError
# from barcode.writer import ImageWriter
from matplotlib import pyplot
from reportlab.graphics.charts.barcharts import VerticalBarChart
from matplotlib import pyplot
from datetime import datetime, timedelta, date
from django.core.files.storage import default_storage
import logging
import random
import requests
import json
import os

# pip install matplotlib
# pip install pillow
# python -m pip install requests
# pip install qrcode


class FacturaView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        # metodo de los meses
        def mesOp(m):
            if(m == '01'):
                return 'Enero'
            elif(m == '02'):
                return 'Febrero'
            elif(m == '03'):
                return 'Marzo'
            elif(m == '04'):
                return 'Abril'
            elif(m == '05'):
                return 'Mayo'
            elif(m == '06'):
                return 'Junio'
            elif(m == '07'):
                return 'Julio'
            elif(m == '08'):
                return 'Agosto'
            elif(m == '09'):
                return 'Septiembre'
            elif(m == '10'):
                return 'Octubre'
            elif(m == '11'):
                return 'Noviembre'
            elif(m == '12'):
                return 'Diciembre'
        # mes corto

        def mesC(m):
            if(m == '01'):
                return 'Ene'
            elif(m == '02'):
                return 'Feb'
            elif(m == '03'):
                return 'Mar'
            elif(m == '04'):
                return 'Abr'
            elif(m == '05'):
                return 'May'
            elif(m == '06'):
                return 'Jun'
            elif(m == '07'):
                return 'Jul'
            elif(m == '08'):
                return 'Ago'
            elif(m == '09'):
                return 'Sep'
            elif(m == '10'):
                return 'Oct'
            elif(m == '11'):
                return 'Nov'
            elif(m == '12'):
                return 'Dic'

        logger = logging.getLogger("mylogger")
        for factura in Factura.objects.all():
            response = HttpResponse(content_type='application/pdf')
            filename = 'factura.pdf'
            response['Content-Disposition'] = 'filename="{filename}"'
            buffer = BytesIO()
            pdf = canvas.Canvas(buffer, pagesize=A4)
            pdf.setTitle("factura.pdf")
            inmuebleFact = Inmueble.objects.get(
                id_inmueble=factura.id_inmueble.id_inmueble)
            usuarioFact = Usuario.objects.get(
                cedula=inmuebleFact.cedula.cedula)
            logo = settings.MEDIA_ROOT+'/logo3r.jpg'
            # ------------------------------------------
            # INFORMACION USUARIO -----------------------
            first_person = str(usuarioFact.nombre)
            cedula = str(usuarioFact.cedula)
            tipo_documento = str(usuarioFact.tipo_documento)
            # INFORMACION INMUEBLE ----------------------
            direccion = str(inmuebleFact.direccion)
            complemento = str(inmuebleFact.complemento)
            ciudad = str(inmuebleFact.ciudad)
            tipo_inmueble = str(inmuebleFact.tipo_inmueble)
            estrato = str(inmuebleFact.estrato)
            barrio = str(inmuebleFact.barrio)
            id_inmuebles = str(inmuebleFact.id_inmueble)
            # INFORMACION FACTURA FECHAS------------------
            f_inicio = factura.fecha_inicio
            div_inicio = str(f_inicio).split('-')
            mes_i = mesOp(div_inicio[1])
            mes_ic = mesC(div_inicio[1])
            f_expedicion = str(factura.fecha_expedicion)
            div_expedicion = f_expedicion.split('-')
            mes_e = mesOp(div_expedicion[1])
            f_vencimiento = str(factura.fecha_vencimiento)
            div_vencimiento = f_vencimiento.split('-')
            mes_v = mesOp(div_vencimiento[1])
            f_corte = factura.fecha_corte
            div_corte = str(f_corte).split('-')
            mes_c = mesC(div_corte[1])
            dias_facturados = f_corte-f_inicio
            dias_facturados = str(dias_facturados.days)
            # INFORMACION FACTURA COSTOS ------------------
            unitario = str(factura.id_tarifa_mes.tarifa_mes)
            costo = str(factura.costo)
            consumo = str(factura.consumo)
            total = str(float(unitario)*float(consumo))
            subcontri_ = str(factura.subsidio_contribucion)
            id_factura = str(factura.id_factura)
            totalF = float(costo)

            # -----------------------------------------
            pdfmetrics.registerFont(
                TTFont('Franklin Gothic Medium', 'framd.ttf'))
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.font = "bold 22px sans-serif"
            altura = 770
            pdf.drawString(50, altura, "ELECTRICFAL - Nit : 890.399.003-7 ")
            pdf.drawString(50, altura-12, first_person)
            pdf.setFont("Franklin Gothic Medium", 9)
            pdf.drawString(50, altura-24, tipo_documento)
            pdf.drawString(90, altura-24, cedula)
            pdf.drawString(50, altura-36, direccion + ' ' + complemento)
            pdf.drawString(50, altura-48, barrio)
            pdf.drawString(50, altura-60, ciudad)
            # ------------------------------------------------

            # -------------------------------------
            # encabezado, marco ,logo
            pdf.setStrokeColorRGB(0.4, 0.9, 0.7)
            pdf.roundRect(10, 10, 575, 800, 8, stroke=1, fill=0)

            pdf.drawImage(logo, 20, 787, 270, 45, preserveAspectRatio=True)
            pdf.roundRect(253, 700, 310, 90, 10, stroke=1, fill=0)  # recuadro
            pdf.setFillColorRGB(0.4, 0.9, 0.7)

            pdf.roundRect(385, 769, 80, 10, 5, stroke=1,
                          fill=1)  # recuadro contrato ide
            # recuadro contrato f_vencimiento
            pdf.roundRect(385, 755, 80, 10, 5, stroke=1, fill=1)
            # recuadro contrato F_EXPEDICION
            pdf.roundRect(385, 741, 80, 10, 5, stroke=1, fill=1)
            # recuadro contrato P_FACTURACION
            pdf.roundRect(385, 725, 80, 10, 5, stroke=1, fill=1)
            # recuadro contrato M_CUENTA
            pdf.roundRect(385, 709, 80, 10, 5, stroke=1, fill=1)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 9)

            pdf.drawString(270, 770, "CONTRATO")
            pdf.drawString(395, 770, id_inmuebles)
            pdf.drawString(270, 755, "FECHA DE VENCIMIENTO")
            pdf.drawString(395, 756, mes_v+' ' +
                           div_vencimiento[2]+'-'+div_vencimiento[0])
            pdf.drawString(270, 740, "FECHA DE EXPEDICION")
            pdf.drawString(395, 742, mes_e+' ' +
                           div_expedicion[2]+'-'+div_expedicion[0])
            pdf.drawString(270, 725, "PERIODO DE FACTURACION")
            pdf.setFont("Franklin Gothic Medium", 9)
            pdf.drawString(395, 726, mes_ic+' ' +
                           div_expedicion[2]+' a ' + mes_c+' '+div_corte[2])
            pdf.setFont("Franklin Gothic Medium", 9)
            pdf.drawString(270, 710, "MES CUENTA")
            pdf.drawString(395, 710, mes_i+' '+div_inicio[0])

            # RECUADRO PEQUEÑO
            pdf.setFillColorRGB(0.4, 0.9, 0.7)
            pdf.roundRect(470, 700, 100, 90, 10, stroke=1, fill=1)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.font = "bold 22px sans-serif"
            pdf.drawString(480, 745, "TOTAL A PAGAR")
            pdf.drawString(480, 730, '$ '+"{:,}".format(totalF))
            # --------------------------------------------------
            # pie de pagina

            pdf.roundRect(20, 20, 420, 80, 10, stroke=1, fill=0)
            img = qrcode.make("Hola aun no tengo funcionalidad :v")
            f = open("./media/" "output.png", "wb")
            img.save(f)
            f.close()
            codi_barras = settings.MEDIA_ROOT+'/output.png'
            # LINEA DE RECORTE
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.drawString(10, 110, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")
            pdf.drawImage(codi_barras, 360, 20, 350,
                          90, preserveAspectRatio=True)
            # RECUADRO PEQUEÑO
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.font = "bold 22px sans-serif"
            pdf.setFillColorRGB(0.4, 0.9, 0.7)
            pdf.roundRect(340, 20, 120, 80, 10, stroke=1, fill=1)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 13)
            pdf.font = "bold 22px sans-serif"
            pdf.drawString(357, 60, "TOTAL A PAGAR")
            pdf.drawString(357, 40, '$ '+"{:,}".format(totalF))
            pdf.drawImage(logo, 30, 70, 60, 60, preserveAspectRatio=True)
            # Info usuario y empresa
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.drawString(30, 75, "ELECTRICFAL ")
            pdf.setFont("Franklin Gothic Medium", 8)
            pdf.drawString(30, 63, "Nit:")
            pdf.drawString(42, 63, "890.399.003-7")
            pdf.drawString(30, 55, "¡Energía más cerca de ti!")
            # recuadro fechas
            pdf.setFillColorRGB(0.4, 0.8, 0.7)
            pdf.roundRect(88, 41, 90, 10, 4, fill=1)
            pdf.roundRect(88, 27, 90, 10, 4, fill=1)
            pdf.roundRect(250, 41, 80, 10, 4, fill=1)
            pdf.roundRect(250, 27, 80, 10, 4, fill=1)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 5)
            pdf.drawString(30, 45, "FECHA DE VENCIMIENTO")
            pdf.drawString(30, 30, "FECHA DE EXPEDICION")
            pdf.drawString(190, 45, "CONTRATO")
            pdf.drawString(190, 30, "FACTURA No.")
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 9)
            pdf.font = "bold 22px sans-serif"
            pdf.drawString(98, 42, mes_v+' ' +
                           div_vencimiento[2]+'-'+div_vencimiento[0])
            pdf.drawString(98, 28, mes_e+' ' +
                           div_expedicion[2]+'-'+div_expedicion[0])
            pdf.drawString(260, 42,  id_inmuebles)
            pdf.drawString(260, 28, id_factura)
            # usario
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 7)
            pdf.font = "bold 22px sans-serif"
            pdf.drawString(200, 85, first_person)
            pdf.drawString(260, 85, direccion + ' ' + complemento)
            pdf.setFont("Franklin Gothic Medium", 7)
            pdf.drawString(200, 78, tipo_documento)
            pdf.drawString(260, 78, cedula)
            pdf.drawString(200, 70, ciudad)
            # ----------------------------------------------------
            # ----------------------------------------------------
            # ESPACIO PUBLICITARIO
            pdf.roundRect(30, 580, 540, 100, 8, fill=0)
            pdf.setFillColorRGB(0.4, 0.9, 0.7)
            pdf.roundRect(40, 670, 520, 20, 8, fill=1)
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 40)
            pdf.drawString(100, 640, "Espacio Publicitario")
            # OBTENER IMAGEN PUBLICIDAD
            subfolder = "Publicidad"
            folder_path = os.path.join(settings.MEDIA_ROOT, subfolder)
            file_list = os.listdir(folder_path)
            random_file = random.choice(file_list)

            publiFa = settings.MEDIA_ROOT + \
                '/Publicidad/{}'.format(str(random_file))
            pdf.drawImage(publiFa, 30, 580, 540, 110,
                          preserveAspectRatio=False)
            # espacio publicitario pie de pagina
            pdf.setFillColorRGB(0.4, 0.9, 0.7)
            # ---------------------------------------------
            # ------- recuadro resumen---
            # creacion de la grafica, implementar consulta

            def add_value_label(x_list, y_list):
                for i in range(0, len(x_list)):
                    pyplot.text(i, y_list[i], y_list[i], ha="center")

            meses = ['NOV', 'DIC', 'ENE']
            consumos3meses = [0, 0, 0]

            ultimos3meses = Factura.objects.filter(
                id_inmueble=id_inmuebles).order_by('fecha_expedicion')[:3]

            # mes1=ultimos3meses[0].consumo
            print("-----------", len(ultimos3meses))

            ultimos3meses = [x.consumo for x in ultimos3meses]

            for i in range(0, len(ultimos3meses)-1):
                if ultimos3meses[i] != 0:
                    consumos3meses[i] = ultimos3meses[i]

            slices = consumos3meses[::-1]

            print(slices)
            #slices = [100, 130, 90, 80, 128, 87]
            colores = ['#7e7e7e', '#888888', '#919191',
                       '#9b9b9b', '#a5a5a5', '#a5a5a5']
            pyplot.bar(meses, height=slices, color=colores, label=slices)
            add_value_label(meses, slices)
            pyplot.title('Consumos anteriores')
            pyplot.ylabel('kWh')
            y = -95
            pyplot.savefig("./media/""grafico.png")
            # ultimo pago
            pdf.setFillColorRGB(0.4, 0.9, 0.7)
            # acuerdo de pago
            pdf.roundRect(45, 350+y, 230, 20, 8, fill=1)
            pdf.roundRect(30, 240+y, 260, 120, 8, fill=0)
            # alumbrado
            pdf.roundRect(315, 340+y, 240, 20, 8, fill=1)
            pdf.roundRect(300, 300+y, 268, 50, 8, fill=0)
            # info recibo
            pdf.roundRect(40, 620+y, 520, 20, 8, fill=1)
            pdf.roundRect(30, 390+y, 540, 240, 8, fill=0)
            # ultimo pago
            pdf.roundRect(315, 270+y, 240, 20, 8, fill=1)
            pdf.roundRect(300, 225+y, 268, 55, 8, fill=0)
            # 5 componentes de pago
            pdf.roundRect(45, 395+y, 500, 15, 5, fill=1)
            grafico = settings.MEDIA_ROOT+'/grafico.png'
            pdf.drawImage(grafico, 35, 440+y, 214, 194,
                          preserveAspectRatio=True)
            # ANCHO  ALTO
            # cuadro que esta al lado del grafico
            pdf.roundRect(270, 550+y, 260, 60, 8, fill=0)
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.roundRect(270, 465+y, 260, 80, 5, fill=0)  # cuadro conceptos
            pdf.setFillColorRGB(0, 0, 0)
            pdf.drawString(50, 529, "ENERGIA")
            # cuodro que esta al debajo del grafico(conceptos cantidad etc )
            pdf.roundRect(45, 395+y, 500, 65, 8, fill=0)
            # Divisiones recaudro
            pdf.roundRect(140, 395+y, 80, 65, 0, fill=0)  # 1
            pdf.roundRect(220, 395+y, 80, 65, 0, fill=0)  # 2
            pdf.roundRect(300, 395+y, 80, 65, 0, fill=0)  # 4
            pdf.roundRect(380, 395+y, 80, 65, 0, fill=0)  # 5
            pdf.setFillColorRGB(0, 0, 0)
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.drawString(330, 347+y, "Alumbrado publico")
            pdf.drawString(50, 355+y, "Total a pagar este mes")
            pdf.drawString(330, 277+y, "Ultimo pago")
            # Datos
            pdf.setFont("Franklin Gothic Medium", 8)
            pdf.drawString(275, 600+y, "Dir instalación")
            pdf.drawString(390, 600+y, direccion + ' ' + complemento)
            pdf.drawString(275, 592+y, "Uso")
            pdf.drawString(390, 592+y, tipo_inmueble)
            pdf.drawString(275, 584+y, "Estrato")
            pdf.drawString(390, 584+y, estrato)
            pdf.drawString(275, 576+y, "No medidor")
            pdf.drawString(390, 576+y, "C_4128852")
            pdf.drawString(275, 568+y, "Lectura Anterior")
            pdf.drawString(390, 568+y, "8.661")
            pdf.drawString(275, 560+y, "Consumo Actual")
            pdf.drawString(390, 560+y, consumo+" kWh")
            pdf.drawString(275, 552+y, "Días Facturados")
            pdf.drawString(390, 552+y, dias_facturados)
            # componentes de costo.
            pdf.setFont("Franklin Gothic Medium", 8)
            pdf.drawString(275, 530+y, 'Componentes del Costo')
            pdf.drawString(275, 523+y, "Generación")
            pdf.drawString(275, 516+y, "Transmisión")
            pdf.drawString(275, 509+y, "Comercialización")
            pdf.drawString(275, 502+y, "Distribución")  # voy
            pdf.drawString(275, 495+y, "Perdida")
            pdf.drawString(275, 488+y, "Restricciones")
            pdf.drawString(275, 481+y, "Cuv Aplicado")
            pdf.drawString(275, 474+y, "Cuv Calculado")
            pdf.drawString(55, 450+y, "CONCEPTOS")  # Componentes del Costo
            pdf.drawString(160, 450+y, "Cantidad")
            pdf.drawString(235, 450+y, "V. Unitario")
            pdf.drawString(315, 450+y, "V. Total")
            pdf.drawString(385, 450+y, "Subsidio/Contrib.")
            pdf.drawString(470, 450+y, "Total a Pagar")
            pdf.drawString(55, 400+y, "Total")
            # compontes abajo del texto
            pdf.setFont("Franklin Gothic Medium", 8)
            pdf.drawString(160, 435+y, consumo)
            pdf.drawString(235, 435+y, unitario)
            pdf.drawString(315, 435+y, total)
            pdf.drawString(385, 435+y, subcontri_)
            pdf.drawString(470, 435+y, costo)
            pdf.drawString(470, 400+y, '$ '+"{:,}".format(totalF))
            # componentes del costo
            pdf.drawString(55, 435+y, "Consumo")
            # texto de pago
            pdf.setFont("Franklin Gothic Medium", 12)
            pdf.drawString(40, 330+y, "Total servicio emcali")
            pdf.drawString(40, 318+y, "Otros servicios")
            pdf.drawString(40, 306+y, "+IVA")
            pdf.drawString(40, 294+y, "Total operacion mes")
            pdf.drawString(40, 282+y, "Cuentas vencidas")
            pdf.drawString(40, 270+y, "Total a pagar")
            pdf.drawString(160, 330+y, "$ "+costo)
            pdf.drawString(160, 318+y, "$0")
            pdf.drawString(160, 306+y, "$0")
            pdf.drawString(160, 294+y, "$0")
            pdf.drawString(160, 282+y, "$0")
            pdf.drawString(160, 270+y, "$0")
            pdf.setFont("Franklin Gothic Medium", 7)
            # texto de ultimo pago
            pdf.drawString(315, 260+y, "Realizado el")
            pdf.drawString(315, 255+y, "Por valor de ")
            pdf.drawString(315, 250+y, "Recibido en ")
            pdf.drawString(315, 240+y, "interes de mora")
            pdf.drawString(390, 260+y, "Realizado el")
            pdf.drawString(390, 255+y, "Por valor de ")
            pdf.drawString(390, 250+y, "Recibido en ")
            pdf.drawString(390, 240+y, "interes de mora")
            # texto de alumbrado publico
            pdf.drawString(310, 330+y, "Municipio de Santiago De Cali")
            pdf.drawString(310, 323+y, "Alumbrado Público "+tipo_inmueble)
            pdf.drawString(310, 306+y, "Total")
            pdf.drawString(500, 323+y, "precio")
            pdf.drawString(500, 306+y, "Total")
            # ------------------------------------
            # Generando codigo Qr
            number = '334444789402'
            # my_code = EAN13(number, writer=ImageWriter())
            pdf.showPage()
            pdf.save()
            pdf = buffer.getvalue()
            buffer.close()
            response.write(pdf)
            subject = "FACTURA - WATTPAY"
            message = "Factura adjunta del consumo del mes:"
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [usuarioFact.correo_electronico]
            email = EmailMessage(subject, message, email_from, recipient_list)
            email.attach('factura.pdf', pdf, 'application/pdf')
            email.send()

        return response


class FacturaDatosView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):

        for inmueble in Inmueble.objects.all():

            url = "https://energy-service-ds-v3cot.ondigitalocean.app/consumption"

            id = inmueble.cedula.cedula

            payload = json.dumps({"client_id": "{id}"})

            headers = {
                'Content-Type': 'application/json'
            }

            response = requests.request(
                "POST", url, headers=headers, data=payload)

            dato = json.loads(response.text)
            consumo = dato['energy consumption']

            estrato = inmueble.estrato
            tipo_inmueble = inmueble.tipo_inmueble

            id_tarifa_mes = '2023-01-01'
            id_tarifa_mes_factura = Tarifa.objects.get(
                id_tarifa_mes=id_tarifa_mes)

            tarifa = id_tarifa_mes_factura.tarifa_mes
            porcentaje_subsidio_contribucion = 1

            if tipo_inmueble == "Comercial" or tipo_inmueble == "Industrial":
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.comercial_industrial
            elif estrato == 1:
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.estrato1
            elif estrato == 2:
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.estrato2
            elif estrato == 3:
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.estrato3
            elif estrato == 4:
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.estrato4
            elif estrato == 5:
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.estrato5
            elif estrato == 6:
                porcentaje_subsidio_contribucion = id_tarifa_mes_factura.estrato6

            costo_normal = consumo*tarifa
            costo_subsidio_contribucion = consumo*tarifa*porcentaje_subsidio_contribucion
            diferencia = costo_subsidio_contribucion-costo_normal

            today = datetime.now() - timedelta(hours=5)
            corte_expedicion = today.replace(day=28)
            vencimiento = today + timedelta(days=7)
            inicio = today.replace(day=1)

            id_publicidad = Publicidad.objects.get(pk=22222)
            fecha_inicio = inicio.strftime('%Y-%m-%d')
            fecha_corte = corte_expedicion.strftime('%Y-%m-%d')
            fecha_vencimiento = vencimiento.strftime('%Y-%m-%d')
            fecha_expedicion = corte_expedicion.strftime('%Y-%m-%d')

            id_inmueble = Inmueble.objects.get(pk=inmueble.id_inmueble)

            Factura.objects.create(consumo=consumo, costo=costo_subsidio_contribucion, id_inmueble=id_inmueble, id_publicidad=id_publicidad, fecha_inicio=fecha_inicio,
                                   fecha_corte=fecha_corte, fecha_vencimiento=fecha_vencimiento, fecha_expedicion=fecha_expedicion, id_tarifa_mes=id_tarifa_mes_factura, subsidio_contribucion=diferencia)

        return Response({'success': 'prueba'})


class PagarPresencialView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        number_list = [100, 123, 369]
        data = self.request.data
        if int(data['cantidad']) == int(Factura.objects.get(pk=data['id_factura']).costo):

            print(data)
            codigo_factura = data['id_factura']
            id_factura = Factura.objects.get(pk=data['id_factura'])
            monto = id_factura.costo
            banco = Bancoaliado.objects.get(pk=random.choice(number_list))
            fecha = date.today()

            f = open(settings.MEDIA_ROOT+'/pagos.txt', "a")
            f.write(str(codigo_factura)+" "+str(monto) +
                    " "+str(banco.id_banco)+" "+str(fecha)+"\n")
            f.close()
            return Response({'success': 'Pago presencial'})

        else:
            return Response({'error': 'Pago fallado'})


class PagarOnlineView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        number_list = [100, 123, 369]
        data = self.request.data
        if int(data['cantidad']) == int(Factura.objects.get(pk=data['id_factura']).costo):

            print(data)
            id_factura = Factura.objects.get(pk=data['id_factura'])
            monto = id_factura.costo
            print(monto)
            id_banco = Bancoaliado.objects.get(pk=random.choice(number_list))
            fecha = date.today()

            Pago.objects.create(monto=monto, id_factura=id_factura,
                                id_banco=id_banco, fecha=fecha)
            return Response({'success': 'Pago online'})

        else:
            return Response({'error': 'Pago fallado'})


class EnviarPagosView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):

        subject = "BANCO DE BOGOTÁ - Pagos realizados"
        message = "Archivo adjunto con los pagos realizados en nuestras sucursales:"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ["wattpaymail@gmail.com"]
        email = EmailMessage(subject, message, email_from, recipient_list)

        path = os.path.join(settings.MEDIA_ROOT, "pagos.txt")

        with open(path, "rb") as f:
            file = f.read()
            email.attach("pagos.txt", file, "text/plan")

        email.send()

        f = open(settings.MEDIA_ROOT+'/pagos.txt', "w")
        f.write("id_factura monto banco fecha\n")
        f.close()

        return Response({'error': 'Pagos enviados'})


class SuspenderClientesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):

        for factura in Factura.objects.all():
            if Pago.objects.filter(id_factura=factura.id_factura).exists():
                None
            elif (factura.fecha_vencimiento + timedelta(days=60)) < date.today():
                # Suspención del servicio al inmueble, e intereses
                print("------>", factura.id_inmueble.id_inmueble)
                Inmueble.objects.filter(id_inmueble=factura.id_inmueble.id_inmueble).update(
                    estado_inmueble="inactivo")
                anadir_intereses = factura.costo*1.02
                factura.intereses = float(anadir_intereses)
                factura.costo = float(factura.costo) + float(anadir_intereses)

        return Response({'success': 'Clientes suspendidos'})


class EnMoraView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):

        data = self.request.data
        cedula = data['cedula']

        al_dia = True

        for factura in Factura.objects.all():
            if factura.id_inmueble.cedula.cedula == cedula:
                if Pago.objects.filter(id_factura=factura.id_factura).exists():
                    None
                elif factura.fecha_vencimiento > date.today():
                    al_dia = False
                else:
                    return Response({'success': 'En mora'})

        if al_dia:
            return Response({'success': 'Facturas al día'})
        else:
            return Response({'success': 'Facturas pendientes'})


class NuevoInmuebleView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        tipo_inmueble = data['tipo_inmueble']
        estrato = data['estrato']
        cedula = Usuario.objects.get(pk=data['cedula'])
        barrio = data['barrio']
        ciudad = data['ciudad']
        direccion = data['direccion']
        complemento = data['complemento']

        Inmueble.objects.create(
            tipo_inmueble=tipo_inmueble, estrato=estrato, cedula=cedula, barrio=barrio, ciudad=ciudad, direccion=direccion, complemento=complemento)

        return Response({'success': 'Inmueble creado'})


class NuevaPublicidadView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        empresa_encargada = data['empresa_encargada']
        precio_publicidad = data['precio_publicidad']
        file = data['file']
        Publicidad.objects.create(
            empresa_encargada=empresa_encargada, precio_publicidad=precio_publicidad)

        return Response({'success': 'Publicidad agregada'})
