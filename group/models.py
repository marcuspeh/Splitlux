import random
import string
import uuid
from django.db import models
from django.utils import timezone

import bisect 

from core.models import User
from transaction.models import Transaction

CHAR_LENGTH = 255

# Create your models here.
class Payment(models.Model):
    payer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_payer')
    payee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_payee')

    amount = models.FloatField()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)

    @staticmethod
    def create(payer, payee, amount):
        obj = Payment.objects.create(payer=payer, payee=payee, amount=amount)
        return obj


class Group(models.Model):
    name = models.CharField(max_length=CHAR_LENGTH)
    members = models.ManyToManyField(User, related_name="group_members")

    transactions = models.ManyToManyField(Transaction)
    to_pay_list = models.ManyToManyField(Payment)

    is_closed = models.BooleanField(default=False)

    code_id = models.CharField(max_length=6, unique=True, default=uuid.uuid4)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, related_name="group_owner")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)

    @staticmethod
    def create(user, name):
        obj = Group.objects.create(name=name, owner=user)
        obj.members.add(user)
        
        obj.code_id = Group.generate_code(6)
        obj.save()

        return obj

    @staticmethod
    def generate_code(n: int):
        alphanumeric = string.ascii_uppercase + string.digits
        code = ''.join(random.choices(alphanumeric, k=n))

        while Group.objects.filter(code_id = code):
            code = ''.join(random.choices(alphanumeric, k=n))

        return code

    def set_is_closed(self, state: bool):
        if type(state) != bool:
            return self

        self.is_closed = state
        if not state:
            self.to_pay_list.clear()

        self.save()

        return self

    def calculate_payments(self):
        # Calculate payments logic here
        surplus_dict = self.get_total_surplus()

        surplus_list = [ (User.objects.get(id=user), amount) for user, amount in surplus_dict.items()]
        surplus_list.sort(key=lambda x: x[1])

        while surplus_list:
            minimum = surplus_list.pop(0)

            if not minimum[1]:
                continue

            maximum = surplus_list.pop() 

            if -minimum[1] < maximum[1]:
                payment = Payment.create(payer=minimum[0], payee=maximum[0], amount=-minimum[1])
                temp = (maximum[0], maximum[1] + minimum[1])
                bisect.insort_right(surplus_list, temp, key=lambda x: x[1]) 

            elif -minimum[1] > maximum[1]:
                payment = Payment.create(payer=minimum[0], payee=maximum[0], amount=maximum[1])
                temp = (minimum[0], minimum[1] + maximum[1])
                bisect.insort_right(surplus_list, temp, key=lambda x: x[1]) 

            else:
                payment = Payment.create(payer=minimum[0], payee=maximum[0], amount=maximum[1])

            self.to_pay_list.add(payment)

        self.is_closed = True
        self.save()

    def get_total_surplus(self):
        surplus = {}

        for transaction in self.transactions.all():
            temp_surplus = transaction.get_surplus()

            for user, amount in temp_surplus.items():
                if user in surplus:
                    surplus[user] += amount
                else:
                    surplus[user] = amount

        return surplus

