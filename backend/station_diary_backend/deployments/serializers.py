from rest_framework import serializers
from .models import Deployment

class DeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = '__all__'

class DeploymentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = ('shift', 'sector', 'users', 'is_active', 'date')