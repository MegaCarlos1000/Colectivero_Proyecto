from django.urls import path
from .views import (
    LoginView,
    RegistrarColectivoView,
    RegistrarConductorView,
    ListarColectivosView,
    ListarConductoresView,
    RegistroPagoCreateView,
    ListarRegistrosPagoView,
    ReporteMensualView,  # Nueva vista importada
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('colectivos/', ListarColectivosView.as_view(), name='listar_colectivos'),
    path('conductores/', ListarConductoresView.as_view(), name='listar_conductores'),
    path('registrar-colectivo/', RegistrarColectivoView.as_view(), name='registrar_colectivo'),
    path('registrar-conductor/', RegistrarConductorView.as_view(), name='registrar_conductor'),
    path('registro_pagos/', RegistroPagoCreateView.as_view(), name='registro_pagos'),
    path('registro_pagos/listar/', ListarRegistrosPagoView.as_view(), name='listar_registros_pagos'),  # Listar pagos
    path('reportes-mensuales/', ReporteMensualView.as_view(), name='reporte_mensual'),  # Nueva ruta para reporte mensual
]
