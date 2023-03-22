from django.urls import path
from .views import NuevoInmuebleView, FacturaView, FacturaDatosView, PagarOnlineView, PagarPresencialView, EnMoraView, NuevaPublicidadView, EnviarPagosView, SuspenderClientesView

urlpatterns = [
    path('nuevoInmueble', NuevoInmuebleView.as_view()),
    path('factura', FacturaView.as_view(),
         name="factura"),
    path('facturaDatos', FacturaDatosView.as_view()),
    path('pagaronline', PagarOnlineView.as_view()),
    path('pagarpresencial', PagarPresencialView.as_view()),
    path('mora', EnMoraView.as_view()),
    path('registrarPublicidad', NuevaPublicidadView.as_view()),
    path('pagosaliados', EnviarPagosView.as_view()),
    path('suspenderclientes', SuspenderClientesView.as_view())
]
