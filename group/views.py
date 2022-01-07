from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response


from core.permission import IsUser
from group.models import Group
from group.serializers import GroupCreateIncomingSerializer, GroupListOutgoingSerializer, \
        GroupJoinIncomingSerializer, GroupSerializer

# Create your views here.
class GroupList(APIView):
    permission_classes = [IsUser]

    def get(self, request, format=None):
        try:
            user = self.request.user
            group_list = Group.objects.filter(members__in=[user])
            return Response(GroupListOutgoingSerializer(group_list, many=True).data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(e.args, status=status.HTTP_404_NOT_FOUND)

class CreateGroup(APIView):
    permission_classes = [IsUser]
    serializer_class = GroupCreateIncomingSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            data = serializer.data
            try:
                obj = Group.create(user=user, name=data["name"])
                return Response(data=GroupListOutgoingSerializer(obj).data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JoinGroup(APIView):
    permission_classes = [IsUser]
    serializer_class = GroupJoinIncomingSerializer

    def put(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            data = serializer.data
            obj = get_object_or_404(Group, code_id=data['group_id'])
            obj.members.add(user)
            return Response(data=GroupListOutgoingSerializer(obj).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetGroup(APIView):
    permission_classes = [IsUser]
    
    def get(self, request, format=None, **kwargs):
        user = self.request.user

        try:
            group = Group.objects.get(id=kwargs['id'])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
            
        if user in group.members.all():
            return Response(data=GroupSerializer(group).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)

class CalculatePayment(APIView):
    permission_classes = [IsUser]
    
    def get(self, request, format=None, **kwargs):
        user = self.request.user
        try:
            group = Group.objects.get(id=kwargs['id'])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)

        if user not in group.members.all():
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)
        elif user == group.owner:
            group.calculate_payments()
            return Response(data=GroupSerializer(group).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not the owner of the group"}, status=status.HTTP_400_BAD_REQUEST)
