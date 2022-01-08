from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from core.permission import IsUser
from group.models import Group
from transaction.models import Transaction
from transaction.serializers import TransactionIncomingSerializer, TransactionSerializer

# Create your views here.
class CreateTransaction(APIView):
    permission_classes = [IsUser]
    serializer_class = TransactionIncomingSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            data = serializer.data

            try:
                group = Group.objects.get(id = data["group_id"])
            except Exception as e:
                return Response(data={"error": e}, status=status.HTTP_400_BAD_REQUEST)

            if group.is_closed:
                return Response(data={"error": "Group is closed"}, status=status.HTTP_400_BAD_REQUEST)

            if user not in group.members.all():
                return Response(data={"error": "You are not part of the specified group"}, status=status.HTTP_400_BAD_REQUEST)

            payers = data['payers']
            for i in range(len(payers)):
                try:
                    payer = User.objects.get(id=payers[i]['user'])
                except Exception as e:
                    return Response(data={"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
                payers[i]['user'] = payer

            expenses = data['expenses']
            for i in range(len(expenses)):
                try:
                    spender = User.objects.get(id=expenses[i]['user'])
                except Exception as e:
                    return Response(data={"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
                expenses[i]['user'] = spender

            members = group.members.all()

            total_payer = data['amount']
            total_expense = data['amount']

            for payer in payers:
                if payer['user'] not in members:
                    return Response({"error": f"{payer['user'].name} not in group"}, status=status.HTTP_400_BAD_REQUEST)
                total_payer -= payer["amount"]

            for expense in expenses:
                if expense['user'] not in members:
                    return Response({"error": f"{expense['user'].name} not in group"}, status=status.HTTP_400_BAD_REQUEST)
                total_expense -= expense["amount"]
            
            if total_payer != 0:
                return Response({"error": "Amount paid does not tally to total"}, status=status.HTTP_400_BAD_REQUEST)
            if total_expense != 0:
                return Response({"error": "Amount expense does not tally to total"}, status=status.HTTP_400_BAD_REQUEST)

            transaction = Transaction.create(title=data['title'], amount=data['amount'], payers=payers, expenses=expenses)
            group.transactions.add(transaction)

            return Response(data=TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetTransaction(APIView):
    permission_classes = [IsUser]
    
    def get(self, request, format=None, **kwargs):
        user = self.request.user

        try:
            transaction = Transaction.objects.get(id=kwargs['id'])
            group = Group.objects.get(transactions__in=[transaction])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)

        if user in group.members.all():
            return Response(data=TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.name} is not in group"}, status=status.HTTP_400_BAD_REQUEST)

class DeleteTransaction(APIView):
    permission_classes = [IsUser]

    def delete(self, request, format=None, **kwargs):
        user = self.request.user

        try:
            transaction = Transaction.objects.get(id=kwargs['id'])
            group = Group.objects.get(transactions__in=[transaction])
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
        
    

        if group.is_closed:
            return Response(data={"error": "Group is closed"}, status=status.HTTP_400_BAD_REQUEST)

        if user in group.members.all():
            transaction.delete()
            
            return Response(data={"sucess": "Transaction deleted"}, status=status.HTTP_201_CREATED)
        else:
            return Response(data={"error": f"{user.name} is not in group"}, status=status.HTTP_400_BAD_REQUEST)