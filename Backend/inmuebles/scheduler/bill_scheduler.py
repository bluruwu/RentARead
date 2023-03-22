from apscheduler.schedulers.background import BackgroundScheduler
from inmuebles.views import FacturaDatosView
import requests


def start():
    # Las facturas son enviadas el dia 28 a las 8:30 AM hora colombiana cada mes
    scheduler = BackgroundScheduler()
    scheduler.add_job(getBill, "cron", day=28, hour=8, minute=30,
                      timezone='america/bogota', id='bill1', replace_existing=True)
    scheduler.add_job(generateBill, "cron", day=28, hour=8, minute=20,
                      timezone='america/bogota', id='bill2', replace_existing=True)
    scheduler.add_job(sendEmailPayments, "cron", day=28, hour=8, minute=19,
                      timezone='america/bogota', id='emailpay', replace_existing=True)
    scheduler.add_job(suspenderClientes, "cron", day=28, hour=8, minute=19,
                      timezone='america/bogota', id='emailpay', replace_existing=True)
    scheduler.start()


def getBill():
    r = requests.get('http://127.0.0.1:8000/api/factura')


def generateBill():
    r = requests.post('http://127.0.0.1:8000/api/facturaDatos')


def sendEmailPayments():
    r = requests.post('http://127.0.0.1:8000/api/pagosaliados')


def suspenderClientes():
    r = requests.post('http://127.0.0.1:8000/api/suspenderclientes')
