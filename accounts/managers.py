from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password
from django.apps import apps



class CustomUserManager(BaseUserManager):
    """
    Custom user model where the email address is the unique identifier
    and has an is_admin field to allow access to the admin app


    """
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError("The given username must be set")


            # Extract additional fields
        first_name = extra_fields.pop("first_name", "")
        last_name = extra_fields.pop("last_name", "")

        email = self.normalize_email(email)
        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)

             # Set first_name and last_name
        user.first_name = first_name
        user.last_name = last_name

        user.save(using=self._db)
        return user


    def create_user(self, username=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        if not email:
            raise ValueError(_("The email must be set"))
        if not password:
            raise ValueError(_("The password must be set"))


        return self._create_user(username, email, password, **extra_fields)

    # def create_user(self, email, password, **extra_fields):
    #     if not email:
    #         raise ValueError(_("The email must be set"))
    #     if not password:
    #         raise ValueError(_("The password must be set"))
    #     email = self.normalize_email(email)

    #     user = self.model(email=email, **extra_fields)
    #     user.make_password(password)
    #     user.save()
    #     return user

    # def create_superuser(self, email, password, **extra_fields):
    #     extra_fields.setdefault('is_active', True)
    #     extra_fields.setdefault('is_superuser', True)
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('role', 1)


    #     if extra_fields.get('role') != 1:
    #         raise ValueError('Superuser must have role of Global Admin')
    #     return self._create_user(email, password, **extra_fields)


    def create_superuser(self, username=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 1)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get('role') != 1:
            raise ValueError('Superuser must have role of Global Admin')

        return self._create_user(username, email, password, **extra_fields)