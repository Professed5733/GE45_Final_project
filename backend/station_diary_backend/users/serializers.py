# serializers.py
from rest_framework import serializers
from .models import Division, Rank, Role, PoliceStation, Account

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

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('user_id', 'email', 'full_name', 'is_active', 'is_admin', 'is_staff', 'rank', 'role', 'station')

class GetUserNamesSerializer(serializers.Serializer):
    user_ids = serializers.ListField(child=serializers.UUIDField())