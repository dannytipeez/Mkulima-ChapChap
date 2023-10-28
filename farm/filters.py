# filters.py
import django_filters
from .models import Service, Produce


class ServiceFilter(django_filters.FilterSet):
    class Meta:
        model = Service
        fields = {
            "status": ["exact"],
            "cost": ["exact", "gte", "lte"],
            "date": ["exact", "gte", "lte"],
        }


class ProduceFilter(django_filters.FilterSet):
    class Meta:
        model = Produce
        fields = {
            "content_type": ["exact"],
            "object_id": ["exact"],
            "date": ["exact", "gte", "lte"],
        }
