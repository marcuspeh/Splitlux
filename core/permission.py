from rest_framework.permissions import BasePermission
from core.models import User

class IsUser(BasePermission):
    """Permission class that checks logged-in Clubs"""

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

class IsAdmin(BasePermission):
    """Permission class that checks logged-in Clubs"""

    def has_permission(self, request, view):
        return request.user.is_admin