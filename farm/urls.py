from django.urls import path
from .views import (
    ServiceCreateView,
    QuestionCreateView,
    LivestockProduceView,
    CropProduceView,
    FarmActivityCreateView,
    AnswerView,
    ServiceListView,
    QuestionListView,
    FarmActivityListView
)

urlpatterns = [
    # URL for booking a service
    path('services/book/', ServiceCreateView.as_view(), name='book-service'),
    path('services/', ServiceListView.as_view(), name='services'),

    # URL for asking a question
    path('questions/ask/', QuestionCreateView.as_view(), name='ask-question'),
    path('questions/', QuestionListView.as_view(), name='questions'),

  # URL for planning a farm activity
    path('farmactivity/plan/', FarmActivityCreateView.as_view(), name='create-farm-activity'),
    path('farmactivity/', FarmActivityListView.as_view(), name='farmactivity'),


    # URL for viewing and adding produce from livestock
    path('livestock-produce/', LivestockProduceView.as_view(), name='livestock-produce'),

    # URL for viewing and adding produce from crop
    path('crop-produce/', CropProduceView.as_view(), name='crop-produce'),

    # URL for viewing and adding answers
    path('questions/answers/', AnswerView.as_view(), name='answers'),
]
