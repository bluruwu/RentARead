from django.urls import path
from .views import PruebaView, RegistrarLibroView

urlpatterns = [
    path('prueba', PruebaView.as_view()),
    path("registrarLibro", RegistrarLibroView.as_view())

]
