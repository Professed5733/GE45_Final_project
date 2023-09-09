# serializers.py
from rest_framework import serializers
from .models import Tencode, PINType, ContactType, SubjectStatus, Subject, SubjectContact

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

'''
class SubjectContactSerializer(serializers.Serializer):
    contact = serializers.CharField()
    contact_type = serializers.CharField()
    subject_id = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), required=False)
'''

class SubjectContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectContact
        exclude = ['subject_id']

class CreateSubjectSerializer(serializers.ModelSerializer):
    contacts = SubjectContactSerializer(many=True, required=False)

    class Meta:
        model = Subject
        fields = '__all__'

    PIN = serializers.CharField(required=False)
    details = serializers.CharField(required=False)
    PIN_type = serializers.PrimaryKeyRelatedField(queryset=PINType.objects.all(), required=False)
    subject_status = serializers.PrimaryKeyRelatedField(queryset=SubjectStatus.objects.all(), required=False)

    contact_details = serializers.SerializerMethodField()

    def get_contact_details(self, obj):
        contacts = SubjectContact.objects.filter(subject_id=obj)
        serialized_contacts = SubjectContactSerializer(contacts, many=True).data
        return serialized_contacts



