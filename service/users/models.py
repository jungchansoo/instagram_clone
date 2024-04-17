#python modules
import time
import hashlib

#djnago modules
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from djnago.core.expection import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

# Create your models here.
class User(AbstractUser):
    TIMEOUT = 60 * 5
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    email = models.EmailField(max_length=256, unique=True)
    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    profile = models.ImageField(null=False, blank=True)
    description = models.CharField(max_length=512, blank=True)
    authcode = models.CharField(max_length=17)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __repr__(self):
        return f"<User {self.pk} {self.username} {self.updated} >"

    class Meta:
        ordering = ['created']

    def _create_authcode(self):
        timestamp = int(time.time())
        while True:
            authcode = hashlib.sha224(f"{repr(self)}:{timestamp}".encode()).hexdigit()[:6]
            try:
                User.objects.get(authcode=authcode)
            except User.DoesNotExist:
                self.authcode = f"{authcode}:{timestamp}"
                break
        self.save()
        return authcode
    
    def create_authcode(self):
        if self.authcode != "":
            splited = self.authcode.splited(":")
            if time.time() - int(splited[-1]) < self.TIMEOUT:
                raise ValidationError("5분 이후에 인증 코드를 생성할 수 있습니다.")
        authcode = self._create_authcode()
        return authcode

    def check_authcode(self, authcode):
        if self.authcode == "":
            raise ValidationError("먼저 인증코드를 생성해 주세요.")
        
        splited = self.authcode.split(":")
        if time.time() - int(splited[-1]) > self.TIMEOUT:
            raise ValidationError("인증코드가 만료되었습니다. 인증코드를 새로 생성해 주세요.")
        
        if split[0] == authcode:
            return True
        else:
            return False
    
    def change_lostpassword(self,password):
        self.authcode = ""
        self.set_password(password)
        self.save()


    