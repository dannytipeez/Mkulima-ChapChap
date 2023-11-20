from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer
from .models import UserAccount, FarmerProfile
from farm.models import Farm
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = '__all__'

class UsersSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role')

class ActiveUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'role')


class ProfileDataSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField()
    farmer_profile = serializers.SerializerMethodField()
    farm = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            'username': obj.username,
            'first_name': obj.first_name,
            'last_name': obj.last_name,
        }

    def get_farmer_profile(self, obj):
        return {
            'contact_info': obj.farmerprofile.contact_info,
            'profile_pic': obj.farmerprofile.profile_pic.url if obj.farmerprofile.profile_pic else None,
        }

    def get_farm(self, obj):
        farm = obj.farmerprofile.farm
        return {
            'name': farm.name,
            'location': farm.location,
            'county': farm.county,
            'sub_county': farm.sub_county,
            'farm_size': str(farm.farm_size),
        }