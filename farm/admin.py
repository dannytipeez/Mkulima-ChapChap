from django.contrib import admin
from .models import Farm, FarmActivity, Livestock, Crop, Produce, Service, Question, Answer, Store, Storage, Tool

# Register the Farm model
@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'county', 'sub_county', 'farm_size')
    list_filter = ('county', 'sub_county')
    search_fields = ('name', 'location', 'county', 'sub_county')

# Register the FarmActivity model
@admin.register(FarmActivity)
class FarmActivityAdmin(admin.ModelAdmin):
    list_display = ('farmer', 'activity_type', 'date', 'time')
    list_filter = ('activity_type', 'date')
    search_fields = ('farmer__username', 'activity_type')

# Register the Livestock model
@admin.register(Livestock)
class LivestockAdmin(admin.ModelAdmin):
    list_display = ('animal_type', 'number', 'frequency',)
    list_filter = ('frequency', 'number',)
    search_fields = ('animal_type',)

# Register the Crop model
@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ('crop_type', 'number', 'frequency',)
    list_filter = ('frequency', 'number',)
    search_fields = ('crop_type',)

@admin.register(Produce)
class ProduceAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'date', 'unit_price', 'producer')
    list_filter = ('date',)
    search_fields = ('name', 'date', 'quantity', 'unit_price', 'producer__name')  # Include additional fields in the search

    # Customize the ordering of the list
    ordering = ('-date',)  # This will order the list by date in descending order

# Register the Service model
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'farmer', 'cost', 'date', 'time', 'status')
    list_filter = ('status', 'date')
    search_fields = ('name', 'farmer__username')

# Register the Question model
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('farmer', 'date_time', 'status', 'question_text', 'answer')
    list_filter = ('status', 'date_time')
    search_fields = ('farmer__username', 'question_text', 'answer__expert__username')

# Register the Answer model
@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('expert', 'date_time', 'answer_text')
    list_filter = ('date_time',)
    search_fields = ('expert__username', 'answer_text')

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'condition', 'last_maintenance_date')
    list_filter = ('condition',)
    search_fields = ('name', 'condition',)

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('farm', 'capacity', 'used_capacity')
    list_filter = ('farm', 'used_capacity')
    search_fields = ('farm__name',)

@admin.register(Storage)
class StorageAdmin(admin.ModelAdmin):
    list_display = ('farm', 'capacity', 'used_capacity')
    list_filter = ('farm', 'used_capacity')
    search_fields = ('farm__name',)