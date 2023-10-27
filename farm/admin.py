from django.contrib import admin
from .models import Farm, FarmActivity, Livestock, Crop, Produce, Service, Question, Answer

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
    list_display = ('animal_type', 'farm', 'frequency', 'produce')
    list_filter = ('farm', 'frequency')
    search_fields = ('animal_type', 'farm__name')

# Register the Crop model
@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ('crop_type', 'farm', 'frequency', 'produce')
    list_filter = ('farm', 'frequency')
    search_fields = ('crop_type', 'farm__name')

# Register the Produce model
@admin.register(Produce)
class ProduceAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'date', 'unit_price')
    list_filter = ('date',)
    search_fields = ('name', 'date')

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
