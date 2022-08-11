import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

CHAR_LENGTH = 255

class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None, **extra_fields):
        """Create user by name, email and password"""
        if not email:
            raise ValueError('User must have an email!')
        user = self.model(name=name, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, name, email, password):
        """Create superuser by email ans password"""
        user = self.create_user(name=name, email=email, password=password, is_superuser=True)
        user.is_admin = True
        user.is_staff = True
        user.save(using=self.db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom User model"""
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    name = models.CharField(max_length=CHAR_LENGTH)
    email = models.EmailField(max_length=CHAR_LENGTH, unique=True)

    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __str__(self):
        return self.email

    def __repr__(self):
        return f"{self.email!r}, {self.is_admin!r}"