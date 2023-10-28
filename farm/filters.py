# filters.py
import django_filters
from .models import Service

class ServiceFilter(django_filters.FilterSet):
    class Meta:
        model = Service
        fields = ['status']
