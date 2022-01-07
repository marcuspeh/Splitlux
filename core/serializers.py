from rest_framework import serializers
from .models import CHAR_LENGTH, User
from django.db import models

CHAR_LENGTH = 255

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        email = models.EmailField(max_length=CHAR_LENGTH, unique=True)
        fields = ('id', 'email', 'is_admin', 'created_at')
