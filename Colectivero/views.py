from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Colectivo, Conductor  # Importa los modelos necesarios
from .serializers import UserSerializer, ColectivoRegistroSerializer, ConductorRegistroSerializer,ColectivoSerializer,ColectivoListSerializer, ConductorListSerializer

# Vista para el inicio de sesión
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            # Busca el usuario por el email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

        # Autentica el usuario
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            # Si el usuario se autentica correctamente, devuelve un token (o cualquier otra información necesaria)
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

class ListarColectivosView(generics.ListAPIView):
    queryset = Colectivo.objects.all()
    serializer_class = ColectivoSerializer

# Vista para listar todos los Conductores
class ListarConductoresView(generics.ListAPIView):
    queryset = Conductor.objects.all()
    serializer_class = ConductorListSerializer
