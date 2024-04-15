# django modules
from django.contrib.auth import authenticate
from django.contrib.auth import login

# drf modules
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

# models
from users.models import User

# serializers 
from users.serializers import UserSerializer


class AuthViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        try:
            user = serializer.save()
        except Exception as e:
            return Response(
                {
                    "message": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        login(request, user)
        return Response(
                serializer.data,
                headers=headers,
                status=status.HTTP_201_CREATED
        )