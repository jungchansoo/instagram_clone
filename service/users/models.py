from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.set_default('is_staff', True)
        extra_fields.set_default('is_superuser', True)
        extra_fields.set_default('is_active', True)
        return self.create_user(email, password, **extra_fields)

# Create your models here.
class User(AbstractUser):
    TIMEOUT = 60 * 5

    email = models.EmailField(max_length=256, unique=True)
    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    profile = models.ImageField(null=False, blank=True)
    description = models.CharField(max_length=512, blank=True)
    authcode = models.CharField(max_length=17)

    created = models.DataTimeField(auto_now_add=True)
    updated = models.DataTimeField(auto_now=True)

    objects = UserManager()
    UserManager = UserManager()

    class Meta:
        ordering = ['created']