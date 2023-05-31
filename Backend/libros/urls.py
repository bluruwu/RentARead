from django.urls import path
from .views import RegistrarLibroView, CatalogoLibrosView, ComprarLibroView, RentarLibroView, IntercambiarLibroView, PerfilVendedorView, AceptarIntercambioView, DenegarIntercambioView

urlpatterns = [
    path("registrarLibro", RegistrarLibroView.as_view()),
    path('catalogolibros', CatalogoLibrosView.as_view()),
    path('comprarlibro', ComprarLibroView.as_view()),
    path('rentarlibro', RentarLibroView.as_view()),
    path('intercambiarlibro', IntercambiarLibroView.as_view()),
    path('aceptarintercambio', AceptarIntercambioView.as_view()),
    path('denegarintercambio', DenegarIntercambioView.as_view()),
    path('perfilvendedor', PerfilVendedorView.as_view()),
]
