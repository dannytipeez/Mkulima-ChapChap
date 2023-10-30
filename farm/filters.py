# filters.py
import django_filters
from .models import Service, Produce
from datetime import datetime, timedelta
from django.utils import timezone



class ServiceFilter(django_filters.FilterSet):
    class Meta:
        model = Service
        fields = {
            "status": ["exact"],
            "cost": ["exact", "gte", "lte"],
            "date": ["exact", "gte", "lte"],
        }


class ProduceFilter(django_filters.FilterSet):
    last_days = django_filters.NumberFilter(
        field_name="date",
        method="filter_last_n_days",
        label="Last N Days",
    )

    class Meta:
        model = Produce
        fields = {
            "name": ['exact'],
            "content_type": ["exact"],
            "object_id": ["exact"],
            "date": ["exact", "gte", "lte"],
        }

    def filter_last_n_days(self, queryset, name, value):
        try:
            n = int(value)
            if n <= 0:
                return queryset
        except ValueError:
            return queryset

        end_date = timezone.now()
        start_date = end_date - timedelta(days=n)
        return queryset.filter(date__range=[start_date, end_date])