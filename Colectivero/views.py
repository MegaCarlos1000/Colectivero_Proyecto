from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import User, Colectivo, Conductor, RegistroPago  # Importa los modelos necesarios
from .serializers import UserSerializer, ColectivoRegistroSerializer, ConductorRegistroSerializer, ColectivoSerializer, ConductorListSerializer, RegistroPagoSerializer

# Vista para el inicio de sesión
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

# Vista para registrar un nuevo Colectivo
class RegistrarColectivoView(APIView):
    def post(self, request):
        serializer = ColectivoRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para registrar un nuevo Conductor
class RegistrarConductorView(APIView):
    def post(self, request):
        serializer = ConductorRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para listar todos los Colectivos
class ListarColectivosView(generics.ListAPIView):
    queryset = Colectivo.objects.all()
    serializer_class = ColectivoSerializer

# Vista para listar todos los Conductores
class ListarConductoresView(generics.ListAPIView):
    queryset = Conductor.objects.all()
    serializer_class = ConductorListSerializer

# Vista para listar todos los Registros de Pago
class ListarRegistrosPagoView(generics.ListAPIView):
    queryset = RegistroPago.objects.all()
    serializer_class = RegistroPagoSerializer

# Vista para crear un nuevo Registro de Pago
class RegistroPagoCreateView(generics.CreateAPIView):
    queryset = RegistroPago.objects.all()
    serializer_class = RegistroPagoSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class ReporteMensualView(APIView):
    def get(self, request):
        # Obtener el primer día del mes actual
        today = timezone.now()
        first_day_of_month = today.replace(day=1)

        # Filtrar registros de pago del mes actual
        registros = RegistroPago.objects.filter(fecha__gte=first_day_of_month)

        # Calcular totales
        total_ideal = sum(registro.tarifa_pagada for registro in registros)
        total_real = sum(registro.tarifa_pagada for registro in registros if registro.pago_realizado)
        
        # Calcular diferencia
        diferencia = total_ideal - total_real

        # Preparar el reporte
        reporte = {
            "total_ideal": total_ideal,
            "total_real": total_real,
            "diferencia": diferencia,
            "registros": RegistroPagoSerializer(registros, many=True).data,
        }

        return Response(reporte, status=status.HTTP_200_OK)