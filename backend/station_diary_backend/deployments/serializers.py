from rest_framework import serializers
from .models import Deployment, Sector, Shift

class DeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = '__all__'

class DeploymentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = ('shift', 'sector', 'users', 'is_active', 'date')

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'
