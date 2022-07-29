from core.serializers import UserNameSerializer
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.core.validators import MaxLengthValidator, MinValueValidator
from rest_framework import serializers

from transaction.models import Transaction, Pair

CHAR_LENGTH = 255

# Pair serializer - for nested serializer
class PairSerializerIncoming(serializers.ModelSerializer):    
    class Meta:
        model = Pair
        fields = ('user', 'amount')

class PairSerializerOutgoing(serializers.ModelSerializer):
    user = UserNameSerializer()
    
    class Meta:
        model = Pair
        fields = ('user', 'amount')

#=============================== Incoming ===============================#

# For creating transaction
class TransactionCreateIncomingSerializer(serializers.Serializer):
    group_id = serializers.UUIDField(format='hex')
    title = serializers.CharField(validators=[MaxLengthValidator(CHAR_LENGTH)])
    amount = serializers.FloatField(validators=[MinValueValidator(0)])
    payers = PairSerializerIncoming(many=True)
    expenses = PairSerializerIncoming(many=True)

# For updating transaction
class TransactionUpdateIncomingSerializer(serializers.Serializer):
    title = serializers.CharField(validators=[MaxLengthValidator(CHAR_LENGTH)])
    amount = serializers.FloatField(validators=[MinValueValidator(0)])
    payers = PairSerializerIncoming(many=True)
    expenses = PairSerializerIncoming(many=True)

#=============================== Outgoing ===============================#

# For displaying transaction for a group
class TransactionSerializer(serializers.ModelSerializer):
    expenses = PairSerializerOutgoing(many=True, read_only=True)
    payers = PairSerializerOutgoing(many=True, read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'title', 'amount', 'payers', 'expenses', 'created_at', 'last_updated')

class SimpleTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'title', 'amount', 'created_at')