from django.contrib import admin

from group.models import Group, Payment
# Register your models here.
@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    pass

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    pass
