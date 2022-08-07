from django.urls import path, include

from transaction.views import CreateTransaction, GetTransaction, DeleteTransaction, UpdateTransaction

urlpatterns = [
    path('create', CreateTransaction.as_view()),
    path('<uuid:id>', GetTransaction.as_view()),
    path('update/<uuid:id>', UpdateTransaction.as_view()),
    path('delete/<uuid:id>', DeleteTransaction.as_view())
]