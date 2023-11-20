from django.contrib import admin
from .models import FarmerProfile, AgriculturalExpertProfile, ServiceProviderProfile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import UserAccount


# Register the FarmerProfile model
@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'farm', 'contact_info', 'profile_pic']
    search_fields = ['user__email', 'user__username', 'user__first_name', 'user__last_name', 'farm__name']

# Register the AgriculturalExpertProfile model
@admin.register(AgriculturalExpertProfile)
class AgriculturalExpertProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization', 'contact_info', 'expertise', 'profile_pic')
    search_fields = ('user__username', 'organization', 'contact_info', 'expertise')

# Register the ServiceProviderProfile model
@admin.register(ServiceProviderProfile)
class ServiceProviderProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'store_location', 'contact_info', 'profile_pic')
    search_fields = ('user__username', 'store_location', 'contact_info')


class UserAccountAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'username', 'role', 'is_active', 'is_staff', 'is_superuser']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('username', 'first_name', 'last_name', 'phone', 'role')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'phone', 'role', 'password1', 'password2'),
        }),
    )


admin.site.register(UserAccount, UserAccountAdmin)