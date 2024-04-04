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
    Storage,
    Store,
    Tool,
    WeatherData,
)

class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = ['city', 'current_weather_data', 'forecast_data', 'timestamp']


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
        fields = '__all__'

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = '__all__'

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


class ProduceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produce
        fields = '__all__'

    def create(self, validated_data):
        # Extract the 'image' from the validated data
        image = validated_data.pop('image', None)

        # Extract the 'content_type' and 'object_id' from the request data
        content_type_name = self.context['request'].data.get('content_type')
        object_id = self.context['request'].data.get('object_id')

        # Get the ContentType instance based on the provided name
        content_type = ContentType.objects.get(model=content_type_name)

        # Call the parent create method
        instance = super().create(validated_data)

        # Set the GenericForeignKey fields
        instance.content_type = content_type
        instance.object_id = object_id
        instance.save()

        # If an image is provided, set it for the instance
        if image:
            instance.image = image
            instance.save()

        return instance

        
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = '__all__'

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = '__all__'

class ServiceBookingSerializer(serializers.Serializer):
    service_id = serializers.IntegerField(required=True)
    date = serializers.DateField(required=True)
    time = serializers.TimeField(required=True)

    def validate_service_id(self, value):
        try:
            service = Service.objects.get(id=value)
            return value
        except Service.DoesNotExist:
            raise serializers.ValidationError("Service does not exist.")


