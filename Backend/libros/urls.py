from django.urls import path
from .views import PruebaView, RegistrarLibroView, CatalogoLibrosView, ComprarLibroView, RentarLibroView, IntercambiarLibroView

urlpatterns = [
    path('prueba', PruebaView.as_view()),
    path("registrarLibro", RegistrarLibroView.as_view()),
    path('catalogolibros', CatalogoLibrosView.as_view()),
    path('comprarlibro', ComprarLibroView.as_view()),
    path('rentarlibro', RentarLibroView.as_view()),
    path('intercambiarlibro', IntercambiarLibroView.as_view()),


]
