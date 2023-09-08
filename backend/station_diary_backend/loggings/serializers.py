# serializers.py
from rest_framework import serializers
from .models import Tencode, PINType, ContactType, SubjectStatus

class TencodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tencode
        fields = '__all__'

class PINTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PINType
        fields = '__all__'

class ContactTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactType
        fields = '__all__'

class SubjectStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectStatus
        fields = '__all__'
