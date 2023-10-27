from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import (
    Farm,
    FarmActivity,
    Livestock,
    Crop,
    Produce,
    Service,
    Question,
    Answer,
)
from .serializers import (
    FarmSerializer,
    FarmActivitySerializer,
    LivestockSerializer,
    CropSerializer,
    ProduceSerializer,
    ServiceSerializer,
    QuestionSerializer,
    AnswerSerializer,
)

# View for booking a service
class ServiceCreateView(generics.CreateAPIView):
    serializer_class = ServiceSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Set the farmer booking the service to the current user
        serializer.save(farmer=self.request.user)

#all services available
class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

# View for asking a question
class QuestionCreateView(generics.CreateAPIView):
    serializer_class = QuestionSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Set the farmer asking the question to the current user
        serializer.save(farmer=self.request.user)

class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


# View for viewing and adding produce from livestock
class LivestockProduceView(generics.ListCreateAPIView):
    queryset = Livestock.objects.all()
    serializer_class = LivestockSerializer
    # permission_classes = [IsAuthenticated]

# View for viewing and adding produce from crop
class CropProduceView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    # permission_classes = [IsAuthenticated]

# View for planning a farm activity
class FarmActivityCreateView(generics.CreateAPIView):
    serializer_class = FarmActivitySerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Set the farmer planning the activity to the current user
        serializer.save(farmer=self.request.user)

#all services available
class FarmActivityListView(generics.ListAPIView):
    queryset = FarmActivity.objects.all()
    serializer_class = FarmActivitySerializer

# View for viewing and adding answers
class AnswerView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    # permission_classes = [IsAuthenticated]
