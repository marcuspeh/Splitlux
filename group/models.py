from django.db import models

import bisect 
import string
import random

from core.models import User
from transaction.models import Transaction

CHAR_LENGTH = 255

# Create your models here.
class Payment(models.Model):
    payer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_payer')
    payee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_payee')

    amount = models.FloatField()

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

    code_id = models.CharField(max_length=CHAR_LENGTH)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, related_name="group_owner")
  
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def create(user, name):
        obj = Group.objects.create(name=name, owner=user)
        obj.members.add(user)
        obj.generate_code()
        obj.save()

        return obj

    def generate_code(self):
        LENGTH = 6

        secret = [i for i in str(self.id)]

        for i in range(LENGTH - len(secret)):
            secret += random.choice(string.ascii_letters)
        
        random.shuffle(secret)

        secret = "".join(secret)

        self.code_id = secret
        self.save()
        return self.code_id

    def calculate_payments(self):
        # Calculate payments logic here
        surplus_dict = self.get_total_surplus()

        surplus_list = [ (User.objects.get(id=user), amount) for user, amount in surplus_dict.items()]
        surplus_list.sort(key=lambda x: x[1])

        while surplus_list:
            minimum = surplus_list.pop(0)
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

