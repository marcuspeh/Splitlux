from django.shortcuts import render

from core.permission import IsUser
from core.profilePicHelper import ProfilePicHelper
from core.serializers import ProfileIncomingSerializer, ProfilePicIncomingSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

# Create your views here.
class UpdateProfilePicture(APIView):
    permission_classes = [IsUser]
    serializer_class = ProfilePicIncomingSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            data = serializer.data
            is_success = ProfilePicHelper.saveProfilePic(user.id, data['pic'])
            if is_success:
                return Response(data={'message': 'updated'}, status=status.HTTP_201_CREATED)
            else:
                return Response(data={'message': 'please try again'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateProfile(APIView):
    permission_classes = [IsUser]
    serializer_class = ProfileIncomingSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            data = serializer.data

            if data['email'] != user.email:
                user.email = data['email']
            
            if data['name'] != user.name:
                user.name = data['name']
    
            try:
                user.save()
                return Response(data={'message': 'updated'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(data={"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckServer(APIView):

    def get(self, request, format=None):
        return Response(data={'message': 'Hello world'}, status=status.HTTP_201_CREATED)
          