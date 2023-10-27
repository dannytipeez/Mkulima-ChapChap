from rest_framework import serializers
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

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = "__all__"

class FarmActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmActivity
        fields = "__all__"

class LivestockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livestock
        fields = "__all__"

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = "__all__"

class ProduceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produce
        fields = "__all__"

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"
