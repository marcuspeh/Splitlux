import uuid
from django.db import models
from django.utils import timezone

from core.models import User

CHAR_LENGTH = 255

# Create your models here.
class Pair(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pair_user')
    amount = models.FloatField()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def create(user, amount):
        obj = Pair.objects.create(user=user, amount=amount)
        return obj

class Transaction(models.Model):
    title = models.CharField(max_length=CHAR_LENGTH)
    amount = models.FloatField()

    payers = models.ManyToManyField(Pair, related_name='transaction_payers')
    expenses = models.ManyToManyField(Pair, related_name='transaction_expenses')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)

    @staticmethod
    def create(title, amount, payers, expenses):
        obj = Transaction.objects.create(title=title, amount=amount)

        for pair in payers:
            user = pair['user']
            amount = pair['amount']
            obj.payers.add(Pair.create(user, amount))

        for pair in expenses:
            user = pair['user']
            amount = pair['amount']
            obj.expenses.add(Pair.create(user, amount))

        obj.save()

        return obj

    def update(self, title, amount, payers, expenses):
        self.title = title
        self.amount = amount

        originalPayers = {pair.user: pair for pair in self.payers.all()}
        originalExpenses = {pair.user: pair for pair in self.expenses.all()}

        self.payers.clear()
        self.expenses.clear()

        for pair in payers:
            user = pair['user']
            amount = pair['amount']
            if user in originalPayers:
                obj = originalPayers[user]
                obj.amount = amount
            else:
                obj = Pair.create(user, amount)
            self.payers.add(obj)

        for pair in expenses:
            user = pair['user']
            amount = pair['amount']
            if user in originalExpenses:
                obj = originalExpenses[user]
                obj.amount = amount
            else:
                obj = Pair.create(user, amount)
            self.expenses.add(obj)

        self.save()

        return obj

    """
    Returns the surplus of the transaction, ie the debit/credit of each person
    for this transaction.
    If the value is positive, the person is expected to receive money whereas negative
    means the person will have to pay money.
    """
    def get_surplus(self):
        surplus = {}

        for pair in self.payers.all():
            surplus[pair.user.id] = pair.amount

        for pair in self.expenses.all():
            if pair.user.id in surplus:
                surplus[pair.user.id] -= pair.amount
            else:
                surplus[pair.user.id] = -pair.amount
        return surplus
