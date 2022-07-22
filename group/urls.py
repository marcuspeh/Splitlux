from django.urls import path
from group.views import GetMember, GetMemberName, GetPayments, GroupList, CreateGroup, JoinGroup, GetGroup, CalculatePayment, ReopenGroup

urlpatterns = [
    path('list/', GroupList.as_view()),
    path('create/', CreateGroup.as_view()),
    path('join/', JoinGroup.as_view()),
    path('members/<uuid:id>/', GetMember.as_view()),
    path('membersName/<uuid:id>/', GetMemberName.as_view()),
    path('<uuid:id>/', GetGroup.as_view()),
    path('calculatepayment/<uuid:id>/', CalculatePayment.as_view()),
    path('payment/<uuid:id>/', GetPayments.as_view()),
    path('reopen/<uuid:id>/', ReopenGroup.as_view())
]
