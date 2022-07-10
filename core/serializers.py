from rest_framework import serializers
from .models import CHAR_LENGTH, User
from django.db import models

CHAR_LENGTH = 255

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        name = models.CharField(max_length=CHAR_LENGTH)
        email = models.EmailField(max_length=CHAR_LENGTH, unique=True)
        fields = ('id', 'name', 'email', 'is_admin', 'created_at', 'last_updated')

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name')
