from django.urls import path, include
from group.views import GroupList, CreateGroup, JoinGroup, GetGroup, CalculatePayment

urlpatterns = [
    path('list/', GroupList.as_view()),
    path('create/', CreateGroup.as_view()),
    path('join/', JoinGroup.as_view()),
    path('<int:id>/', GetGroup.as_view()),
    path('calculatepayment/<int:id>/', CalculatePayment.as_view())
]
