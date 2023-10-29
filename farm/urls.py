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
    path('v1/questions/ask/', QuestionCreateView.as_view(), name='ask-question'),
    path('v1/questions/', QuestionListView.as_view(), name='questions'),
    path('v1/questions/answers/', AnswerView.as_view(), name='answers'),

    path('v1/livestock/', LivestockListCreateView.as_view(), name='livestock-list'),
    path('v1/livestock/<int:pk>/', LivestockRetrieveUpdateDestroyView.as_view(), name='livestock-detail'),

    path('v1/crop/', CropListCreateView.as_view(), name='crop-list'),
    path('v1/crop/<int:pk>/', CropRetrieveUpdateDestroyView.as_view(), name='crop-detail'),

    path('v1/produce/', ProduceListCreateView.as_view(), name='produce-list'),
    path('v1/produce/<int:pk>/', ProduceRetrieveUpdateDestroyView.as_view(), name='produce-detail'),

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
