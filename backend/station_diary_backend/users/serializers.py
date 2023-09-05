# serializers.py
from rest_framework import serializers
from .models import Division, Rank, Role, PoliceStation

class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = '__all__'

class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class PoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceStation
        fields = '__all__'
