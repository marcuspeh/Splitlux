from djoser.serializers import UserCreateSerializer, UserSerializer
from django.core.validators import MaxLengthValidator, MinValueValidator
from rest_framework import serializers

from group.models import *
from transaction.serializers import TransactionSerializer

# Payment serializer - for nested serializer
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'payer', 'payee', 'amount')

#=============================== Incoming ===============================#

# For joining group
class GroupCreateIncomingSerializer(serializers.Serializer):
    name = serializers.CharField(validators=[MaxLengthValidator(CHAR_LENGTH)])

# For creating group
class GroupJoinIncomingSerializer(serializers.Serializer):
    group_id = serializers.CharField(validators=[MaxLengthValidator(CHAR_LENGTH)])

#=============================== Outgoing ===============================#

# To display list of group
class GroupListOutgoingSerializer(serializers.Serializer):
    id = serializers.IntegerField(validators=[MinValueValidator(1)])
    name = serializers.CharField(validators=[MaxLengthValidator(CHAR_LENGTH)])
    code_id = serializers.CharField(validators=[MaxLengthValidator(CHAR_LENGTH)])

# To display specific group
class GroupSerializer(serializers.ModelSerializer):
    to_pay_list = PaymentSerializer(many=True, read_only=True)
    transaction_list = TransactionSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'members', 'owner', 'transaction_list', 'to_pay_list', 
            'is_closed', 'code_id') 
