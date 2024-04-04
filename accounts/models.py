from django.db import models
import uuid
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from .managers import CustomUserManager
from farm.models import Farm


# user model
class UserAccount(AbstractBaseUser, PermissionsMixin):
    # this fields tie to the roles
    ADMIN = 1
    FARMER = 2
    AGRI_EXPERT = 3
    SERVICE_PROVIDER = 4

    ROLE_CHOICES = (
        (ADMIN, "admin"),
        (FARMER, "farmer"),
        (AGRI_EXPERT, "agri_expert"),
        (SERVICE_PROVIDER, "service_provider"),
    )

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    # roles created here
    username = models.CharField(max_length=50, unique=True)
    id = models.UUIDField(
        primary_key=True,
        unique=True,
        editable=False,
        default=uuid.uuid4,
        verbose_name="Public identifier",
    )
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=30, unique=True)
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=False, null=False, default=2
    )
    date_joined = models.DateTimeField(auto_now_add=True)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "role", "phone"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class FarmerProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    farm = models.ForeignKey(Farm, blank=True, null=True, on_delete=models.CASCADE)
    contact_info = models.TextField(
        null=True, blank=True
    )  # Contact information of the expert
    profile_pic = models.ImageField(upload_to="farmer_profile_images/", blank=True, null=True)

    def __str__(self):
        return self.user.username


class AgriculturalExpertProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100, null=True, blank=True)
    contact_info = models.TextField(
        null=True, blank=True
    )  # Contact information of the expert
    expertise = models.TextField(null=True, blank=True)
    profile_pic = models.ImageField(upload_to="expert_profile_images/", blank=True, null=True)


    def __str__(self):
        return self.user.username


class ServiceProviderProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    contact_info = models.TextField(
        null=True, blank=True
    )  # Contact information of the expert
    store_location = models.CharField(max_length=100, null=True, blank=True)
    profile_pic = models.ImageField(upload_to="provider_profile_images/", blank=True, null=True)


    def __str__(self):
        return self.user.username
