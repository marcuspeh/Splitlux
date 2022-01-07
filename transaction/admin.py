from django.contrib import admin

from transaction.models import Transaction, Pair
# Register your models here.
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    pass

@admin.register(Pair)
class PairAdmin(admin.ModelAdmin):
    pass
