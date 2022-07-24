from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response


from core.permission import IsUser
from group.models import Group
from group.serializers import GroupCreateIncomingSerializer, GroupListOutgoingSerializer, \
        GroupJoinIncomingSerializer, GroupMembersListOutgoingSerializer, GroupMembersNameOutgoingSerializer, GroupPaymentsListOutgoingSerializer, GroupSerializer

# Create your views here.
class GroupList(APIView):
    permission_classes = [IsUser]

    def get(self, request, format=None):
        try:
            n = request.GET.get("n")
            search = request.GET.get("q")
        
            user = self.request.user
            group_list = Group.objects.filter(members__in=[user])

            if search:
                group_list = group_list.filter(name__contains=search)

            if n and n.isnumeric():
                group_list = group_list.order_by('-last_updated')[:int(n)]
            else:
                group_list = group_list.order_by('-last_updated')
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

            if obj.is_closed:
                return Response(data={"error": f"{obj.name} is closed"}, status=status.HTTP_400_BAD_REQUEST)
                
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
            data = GroupSerializer(group).data
            data['is_owner'] = user == group.owner
            return Response(data=data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)

class GetMember(APIView):
    permission_classes = [IsUser]
    
    def get(self, request, format=None, **kwargs):
        user = self.request.user

        try:
            group = Group.objects.get(id=kwargs['id'])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
            
        if user in group.members.all():
            return Response(data=GroupMembersListOutgoingSerializer(group).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)

class GetMemberName(APIView):
    permission_classes = [IsUser]
    
    def get(self, request, format=None, **kwargs):
        user = self.request.user

        try:
            group = Group.objects.get(id=kwargs['id'])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
            
        if user in group.members.all():
            return Response(data=GroupMembersNameOutgoingSerializer(group).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)

class GetPayments(APIView):
    permission_classes = [IsUser]
    
    def get(self, request, format=None, **kwargs):
        user = self.request.user

        try:
            group = Group.objects.get(id=kwargs['id'])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
            
        if user not in group.members.all():
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)
        elif not group.is_closed:
            return Response(data={"error": f"Payments are not calculated yet."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data=GroupPaymentsListOutgoingSerializer(group).data, status=status.HTTP_201_CREATED)

class ReopenGroup(APIView):
    permission_classes = [IsUser]

    def put(self, request, format=None, **kwargs):
        user = self.request.user
        obj = get_object_or_404(Group, id=kwargs['id'])

        if user not in obj.members.all():
            return Response(data={"error": f"{user.email} is not in group"}, status=status.HTTP_400_BAD_REQUEST)
        elif user == obj.owner:
            if obj.is_closed:
                obj.set_is_closed(False)
                data = GroupSerializer(obj).data
                data['is_owner'] = user == obj.owner
            return Response(data=data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not the owner of the group"}, status=status.HTTP_400_BAD_REQUEST)

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
            if not group.is_closed:
                group.calculate_payments()
                data = GroupSerializer(group).data
                data['is_owner'] = user == group.owner
            return Response(data=data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.email} is not the owner of the group"}, status=status.HTTP_400_BAD_REQUEST)
