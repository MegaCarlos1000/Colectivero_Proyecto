from django.urls import path
from .views import LoginView, RegistrarColectivoView, RegistrarConductorView, ListarColectivosView, ListarConductoresView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('colectivos/', ListarColectivosView.as_view(), name='listar_colectivos'),
    path('conductores/', ListarConductoresView.as_view(), name='listar_conductores'),
    path('registrar-colectivo/', RegistrarColectivoView.as_view(), name='registrar_colectivo'),
    path('registrar-conductor/', RegistrarConductorView.as_view(), name='registrar_conductor'),
]
