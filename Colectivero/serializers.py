from rest_framework import serializers
from .models import User, Colectivo, Conductor, RegistroPago, ReporteMensual

# Serializador para el modelo User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_staff']  # Incluye el campo is_staff

# Serializador para el modelo Colectivo
class ColectivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colectivo
        fields = ['id', 'patente', 'modelo', 'anio']

# Serializador para el modelo Conductor
class ConductorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Conductor
        fields = ['id', 'user', 'colectivo']

# Serializador para el modelo RegistroPago
class RegistroPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroPago
        fields = ['id', 'conductor', 'fecha', 'tarifa_pagada', 'trabajado']

# Serializador para el modelo ReporteMensual
class ReporteMensualSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReporteMensual
        fields = ['id', 'conductor', 'mes', 'total_ideal', 'total_real', 'diferencia']
