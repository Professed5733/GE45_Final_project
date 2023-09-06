from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

# Create your models here.
class Rank(models.Model):
    rank = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.rank

class Role(models.Model):
    role = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.role

class Division(models.Model):
    division = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.division

class PoliceStation(models.Model):
    station = models.CharField(max_length=255, primary_key=True)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)

    def __str__(self):
        return self.station

class AccountManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        if not email:
            raise ValueError('user must have a valid email')

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
        )

        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, full_name, password):
        user = self.create_user(
            email=email,
            full_name=full_name,
            password=password
        )

        user.is_superuser = True
        user.is_admin = True
        user.save(using=self.db)
        return user
class Account(AbstractBaseUser, PermissionsMixin):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    full_name = models.CharField(max_length=50)
    rank = models.ForeignKey(Rank, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    station = models.ForeignKey(PoliceStation, on_delete=models.CASCADE)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']
    USER_ID_FIELD = 'user_id'

    def __str__(self):
        return f'{self.full_name}'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True