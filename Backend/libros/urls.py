from django.urls import path
from .views import PruebaView, RegistrarLibroView, CatalogoLibrosView

urlpatterns = [
    path('prueba', PruebaView.as_view()),
    path("registrarLibro", RegistrarLibroView.as_view()),
    path('catalogolibros', CatalogoLibrosView.as_view())

]
