from django.urls import path
from .views import (
    QuestionCreateView,
    AnswerView,
    QuestionListView,
    FarmListCreateView,
    FarmRetrieveUpdateDestroyView,
    ServiceListCreateView,
    ServiceRetrieveUpdateDeleteView,
    FarmActivityListCreateView,
    FarmActivityRetrieveUpdateDestroyView,
    LivestockListCreateView,
    LivestockRetrieveUpdateDestroyView,
    CropListCreateView,
    CropRetrieveUpdateDestroyView,
    ProduceListCreateView,
    ProduceRetrieveUpdateDestroyView,
    ToolListCreateView,
    StoreListCreateView,
    StoreRetrieveUpdateDestroyView,
    ToolMaintenanceView,
    ToolRetrieveUpdateDestroyView,
    StorageListCreateView,
    StorageRetrieveUpdateDestroyView,
    CheckStorageCapacityView,
    CheckStoreCapacityView,
    LivestockProduceListView,
    CropProduceListView,
    ChatGPTView,
    ServiceBookingView,
)

urlpatterns = [
    path('farms/', FarmListCreateView.as_view(), name='farm-list-create'),
    path('farms/<int:pk>/', FarmRetrieveUpdateDestroyView.as_view(), name='farm-retrieve-update-destroy'),

    # URL for listing all farm activities and creating a new farm activity
    path('farm-activities/', FarmActivityListCreateView.as_view(), name='farm-activity-list'),
    path('farm-activities/<int:pk>/', FarmActivityRetrieveUpdateDestroyView.as_view(), name='farm-activity-detail'),

    path('services/', ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceRetrieveUpdateDeleteView.as_view(), name='service-retrieve-update-delete'),
    path('services/<int:pk>/book/', ServiceBookingView.as_view(), name='service-booking'),


    # URL for asking a question

    path('questions/', QuestionListView.as_view(), name='questions'),
    path('questions/ask/expert/', QuestionCreateView.as_view(), name='ask-expert'),
    path('questions/ask/chatgpt/', ChatGPTView.as_view(), name='ask-gpt'),
    path('questions/answers/', AnswerView.as_view(), name='answers'),

    path('livestock/', LivestockListCreateView.as_view(), name='livestock-list'),
    path('livestock/<int:pk>/', LivestockRetrieveUpdateDestroyView.as_view(), name='livestock-detail'),

    path('crop/', CropListCreateView.as_view(), name='crop-list'),
    path('crop/<int:pk>/', CropRetrieveUpdateDestroyView.as_view(), name='crop-detail'),

    path('produce/', ProduceListCreateView.as_view(), name='produce-list'),
    path('produce/<int:pk>/', ProduceRetrieveUpdateDestroyView.as_view(), name='produce-detail'),
    path('produce/livestock/', LivestockProduceListView.as_view(), name='livestock-produce-list'),
    path('produce/crop/', CropProduceListView.as_view(), name='crop-produce-list'),

    path('stores/', StoreListCreateView.as_view(), name='store-list-create'),
    path('stores/<int:pk>/', StoreRetrieveUpdateDestroyView.as_view(), name='store-retrieve-update-destroy'),
    path('stores/check-capacity/', CheckStoreCapacityView.as_view(), name='check-store-capacity'),

    path('storages/', StorageListCreateView.as_view(), name='storage-list-create'),
    path('storages/<int:pk>/', StorageRetrieveUpdateDestroyView.as_view(), name='storage-retrieve-update-destroy'),
    path('storages/check-capacity/', CheckStorageCapacityView.as_view(), name='check-storage-capacity'),

    path('tools/', ToolListCreateView.as_view(), name='tool-list-create'),
    path('tools/<int:pk>/', ToolRetrieveUpdateDestroyView.as_view(), name='tool-retrieve-update-destroy'),
    path('tools/<int:pk>/maintenance/', ToolMaintenanceView.as_view(), name='tool-maintenance'),
]
