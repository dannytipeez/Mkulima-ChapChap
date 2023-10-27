from django.contrib import admin
from .models import FarmerProfile, AgriculturalExpertProfile, ServiceProviderProfile

# Register the FarmerProfile model
@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'farm', 'contact_info')
    search_fields = ('user__username', 'farm__name', 'contact_info')

# Register the AgriculturalExpertProfile model
@admin.register(AgriculturalExpertProfile)
class AgriculturalExpertProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization', 'contact_info', 'expertise')
    search_fields = ('user__username', 'organization', 'contact_info', 'expertise')

# Register the ServiceProviderProfile model
@admin.register(ServiceProviderProfile)
class ServiceProviderProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'store_location', 'contact_info')
    search_fields = ('user__username', 'store_location', 'contact_info')
