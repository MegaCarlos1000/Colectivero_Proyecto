from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User  # Asegúrate de importar tu modelo User
from .serializers import UserSerializer  # Asegúrate de que este serializer exista

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
