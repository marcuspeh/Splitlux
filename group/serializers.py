from email.policy import default
from django.core.validators import MaxLengthValidator
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
class GroupListOutgoingSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ('id', 'name', 'member_count', 'code_id', 'is_closed')
    
    def get_member_count(self, obj):
        member_count = obj.members.all().count()
        return member_count

# To display specific group
class GroupSerializer(serializers.ModelSerializer):
    transactions = SimpleTransactionSerializer(many=True, read_only=True)
    members = SimpleUserSerializer(many=True, read_only=True)
    member_count = serializers.SerializerMethodField()
    owner = SimpleUserSerializer(many=False, read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'owner', 'members',  'member_count','transactions', 'is_closed', 'code_id') 

    def get_member_count(self, obj):
        member_count = obj.members.all().count()
        return member_count
