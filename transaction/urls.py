from django.urls import path, include

from transaction.views import CreateTransaction, GetTransaction, DeleteTransaction

urlpatterns = [
    path('create/', CreateTransaction.as_view()),
    path('<int:id>/', GetTransaction.as_view()),
    path('delete/<int:id>/', DeleteTransaction.as_view())
]