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
        user_ids = []
        for user_id in values:
            try:
                user = Account.objects.get(user_id=user_id)
                user_ids.append(user.user_id)
            except Account.DoesNotExist:
                raise serializers.ValidationError(f"User with ID '{user_id}' does not exist.")
        return user_ids



class EditDeploymentSerializer(serializers.ModelSerializer):

    users = serializers.PrimaryKeyRelatedField(
        queryset=Account.objects.all(),
        many=True  # Allow multiple users to be selected
    )

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
    '''
    def validate_users(self, values):
        user_ids = []
        for full_name in values:
            try:
                user = Account.objects.get(full_name=full_name)
                user_ids.append(user.user_id)
            except Account.DoesNotExist:
                print("Invalid user_id: ",user_id )
                raise serializers.ValidationError(f"User with full_name '{full_name}' does not exist.")
        return user_ids
    '''

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['users'] = [user.user_id for user in instance.users.all()]
        return representation

    def update(self, instance, validated_data):
        print("validated_data_after_representation['users']: ", validated_data.get('users'))
        print("validated_data['shift']: ", validated_data.get('shift'))
        print("instance: ", instance)
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
