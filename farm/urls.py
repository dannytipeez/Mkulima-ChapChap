from django.urls import path
from .views import (
    QuestionCreateView,
    LivestockProduceView,
    CropProduceView,
    AnswerView,
    QuestionListView,
    FarmListCreateView,
    FarmRetrieveUpdateDestroyView,
    ServiceListCreateView,
    ServiceRetrieveUpdateDeleteView,
    FarmActivityListCreateView,
    FarmActivityRetrieveUpdateDestroyView
)

urlpatterns = [
    path('v1/farms/', FarmListCreateView.as_view(), name='farm-list-create'),
    path('v1/farms/<int:pk>/', FarmRetrieveUpdateDestroyView.as_view(), name='farm-retrieve-update-destroy'),

    # URL for listing all farm activities and creating a new farm activity
    path('v1/farm-activities/', FarmActivityListCreateView.as_view(), name='farm-activity-list'),
    path('v1/farm-activities/<int:pk>/', FarmActivityRetrieveUpdateDestroyView.as_view(), name='farm-activity-detail'),

    path('v1/services/', ServiceListCreateView.as_view(), name='service-list-create'),
    path('v1/services/<int:pk>/', ServiceRetrieveUpdateDeleteView.as_view(), name='service-retrieve-update-delete'),


    # URL for asking a question
    path('questions/ask/', QuestionCreateView.as_view(), name='ask-question'),
    path('questions/', QuestionListView.as_view(), name='questions'),
    path('questions/answers/', AnswerView.as_view(), name='answers'),

    # URL for viewing and adding produce from livestock
    path('livestock-produce/', LivestockProduceView.as_view(), name='livestock-produce'),

    # URL for viewing and adding produce from crop
    path('crop-produce/', CropProduceView.as_view(), name='crop-produce'),
]
