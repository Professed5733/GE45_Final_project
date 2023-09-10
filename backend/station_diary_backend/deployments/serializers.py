from rest_framework import serializers
from .models import Deployment, Sector, Shift
from users.models import Account
import uuid

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'

class CreateDeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = '__all__'



    def validate_shift(self, value):
        try:
            shift = Shift.objects.get(shift=value)
            return shift
        except Shift.DoesNotExist:
            raise serializers.ValidationError("Invalid shift")

    def validate_sector(self, value):
        try:
            sector = Sector.objects.get(sector=value)
            return sector
        except Sector.DoesNotExist:
            raise serializers.ValidationError("Invalid sector")

    def validate_users(self, values):
        valid_user_ids = [str(user.user_id) for user in values]
        for user_id in valid_user_ids:
            if user_id not in valid_user_ids:
                raise serializers.ValidationError(f"Invalid user ID in 'users': {user_id}")
        return values



class EditDeploymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deployment
        fields = '__all__'

    def validate_shift(self, value):
        try:
            shift = Shift.objects.get(shift=value)
            return shift
        except Shift.DoesNotExist:
            raise serializers.ValidationError("Invalid shift")

    def validate_sector(self, value):
        try:
            sector = Sector.objects.get(sector=value)
            return sector
        except Sector.DoesNotExist:
            raise serializers.ValidationError("Invalid sector")

    def validate_users(self, values):
        valid_user_ids = [str(user.user_id) for user in values]
        for user_id in valid_user_ids:
            if user_id not in valid_user_ids:
                raise serializers.ValidationError(f"Invalid user ID in 'users': {user_id}")
        return values

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['users'] = [user.user_id for user in instance.users.all()]
        return representation

    def update(self, instance, validated_data):
        # Update the instance fields with the validated data
        for attr, value in validated_data.items():
            if attr != 'users':  # Skip 'users' field
                setattr(instance, attr, value)

        # Update the many-to-many relationship for 'users'
        if 'users' in validated_data:
            instance.users.set(validated_data['users'])

        # Save the updated instance
        instance.save()

        return instance

class GetDeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = '__all__'