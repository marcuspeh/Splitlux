from core.profilePicHelper import ProfilePicHelper
from rest_framework import serializers
from .models import CHAR_LENGTH, User
from django.db import models


CHAR_LENGTH = 255

#=============================== Incoming ===============================#
class ProfilePicIncomingSerializer(serializers.Serializer):
    pic = serializers.CharField()

class ProfileIncomingSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=CHAR_LENGTH)
    email = serializers.EmailField(max_length=CHAR_LENGTH)


#=============================== OUTGOING ===============================#
class UserCreateSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = User
        name = models.CharField(max_length=CHAR_LENGTH)
        email = models.EmailField(max_length=CHAR_LENGTH, unique=True)
        fields = ('id', 'name', 'email', 'profile_pic')
    
    def get_profile_pic(self, obj):
        return ProfilePicHelper.getProfilePic(obj.id)

class SimpleUserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'name', 'profile_pic')

    def get_profile_pic(self, obj):
        return ProfilePicHelper.getProfilePic(obj.id)

class UserNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'name')

