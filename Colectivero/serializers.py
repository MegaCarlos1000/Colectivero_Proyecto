from rest_framework import serializers
from .models import User, Colectivo, Conductor, RegistroPago, ReporteMensual

# Serializador para el modelo User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_staff']  # Incluye el campo is_staff

# Serializador para el modelo Colectivo (Lectura)
class ColectivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colectivo
        fields = ['id', 'patente', 'modelo', 'anio']

# Serializador para el modelo Colectivo (Registro)
class ColectivoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colectivo
        fields = ['patente', 'modelo', 'anio']

# Serializador para el modelo Conductor (Lectura)
class ConductorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Conductor
        fields = ['id', 'user', 'colectivo']

# Serializador para el modelo Conductor (Registro)
class ConductorRegistroSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)  # Incluir detalles del usuario al crear un conductor

    class Meta:
        model = Conductor
        fields = ['user', 'colectivo']

    def create(self, validated_data):
        user_data = validated_data.pop('user')  # Extraer datos del usuario
        user = User.objects.create(**user_data)  # Crear el usuario
        conductor = Conductor.objects.create(user=user, **validated_data)  # Crear el conductor
        return conductor


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

# Serializador para listar todos los Colectivos
class ColectivoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colectivo
        fields = ['id', 'patente', 'modelo', 'anio']

# Serializador para listar todos los Conductores
class ConductorListSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Conductor
        fields = ['id', 'user', 'colectivo']
