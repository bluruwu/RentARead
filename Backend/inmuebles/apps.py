from django.apps import AppConfig
import os

class InmueblesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'inmuebles'

    if os.environ.get('RUN_MAIN'):
        def ready(self):
            print("Verificando envio de facturas...")
            from .scheduler import bill_scheduler
            bill_scheduler.start()