from django.core.validators import MaxLengthValidator, MinValueValidator
from rest_framework import serializers

from core.serializers import SimpleUserSerializer
from group.models import *
from transaction.serializers import SimpleTransactionSerializer

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
    transactions = SimpleTransactionSerializer(many=True, read_only=True)
    members = SimpleUserSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'members', 'transactions', 'is_closed', 'code_id') 
