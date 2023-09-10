from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import SubjectStatus, Tencode, PINType, ContactType, SubjectContact, Subject
from .serializers import TencodeSerializer, ContactTypeSerializer, PINTypeSerializer, SubjectStatusSerializer, CreateSubjectSerializer, EditSubjectSerializer

# Create your views here.
class seedBase(APIView):
    def post(self, request):
        tencode_to_add = [
            {'tencode': '10-1', 'description': 'Free at a fixed point, ready for dispatch.'},
            {'tencode': '10-2', 'description': 'Proceeding to scene.'},
            {'tencode': '10-3', 'description': 'Resume normal duty (after handling case).'},
            {'tencode': '10-4', 'description': 'Proceeding to location in relation to scene (e.g., 10-4 escorting 1 arrest subject).'},
            {'tencode': '10-5', 'description': 'Conducting checks at.'},
            {'tencode': '10-6', 'description': 'Immobilized.'},
            {'tencode': '10-7', 'description': 'Arrived at scene.'},
            {'tencode': '10-8', 'description': 'Official break.'},
            {'tencode': '10-9', 'description': 'Report for duty.'},
            {'tencode': '10-0', 'description': 'Report off duty.'},
        ]
        for tencode_data in tencode_to_add:
            if not Tencode.objects.filter(tencode=tencode_data['tencode']).exists():
                tencode = Tencode(
                    tencode=tencode_data['tencode'],
                    description=tencode_data['description'],
                )
                tencode.save()

        subject_status_to_add = [
            {'subject_status': 'Red'},
            {'subject_status': 'Amber'},
            {'subject_status': 'Green'},
        ]
        for subject_status_data in subject_status_to_add:
            if not SubjectStatus.objects.filter(subject_status=subject_status_data['subject_status']).exists():
                subject_status = SubjectStatus(
                    subject_status=subject_status_data['subject_status'],
                )
                subject_status.save()

        pin_type_to_add = [
            {'PIN_Type': 'NRIC'},
            {'PIN_Type': 'FIN'},
            {'PIN_Type': 'Passport'},
        ]
        for pin_type_data in pin_type_to_add:
            if not PINType.objects.filter(PIN_Type=pin_type_data['PIN_Type']).exists():
                pin_type = PINType(
                    PIN_Type=pin_type_data['PIN_Type'],
                )
                pin_type.save()

        contact_type_to_add = [
            {'contact_type': 'Mobile Phone'},
            {'contact_type': 'Home Phone'},
            {'contact_type': 'Office Phone'},
            {'contact_type': 'Email'},
        ]
        for contact_type_data in contact_type_to_add:
            if not ContactType.objects.filter(contact_type=contact_type_data['contact_type']).exists():
                contact_type = ContactType(
                    contact_type=contact_type_data['contact_type'],
                )
                contact_type.save()

        return Response({"message": "Initial logging data seeding complete"}, status=status.HTTP_201_CREATED)


class DataListView(APIView):
    def get(self, request, data_type):
        if data_type == "tencode":
            divisions = Tencode.objects.all()
            serializer = TencodeSerializer(divisions, many=True)
        elif data_type == "PIN_Type":
            stations = PINType.objects.all()
            serializer = PINTypeSerializer(stations, many=True)
        elif data_type == "contact_type":
            roles = ContactType.objects.all()
            serializer = ContactTypeSerializer(roles, many=True)
        elif data_type == "subject_status":
            ranks = SubjectStatus.objects.all()
            serializer = SubjectStatusSerializer(ranks, many=True)
        else:
            return Response({"error": "Invalid data type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateSubjectView(APIView):
    def put(self, request, format=None):
        serializer = CreateSubjectSerializer(data=request.data)
        if serializer.is_valid():
            # Extract the contacts data from the request
            contacts_data = serializer.validated_data.pop('contacts', [])

            # Create the Subject object
            subject = Subject.objects.create(**serializer.validated_data)

            # Create the associated SubjectContact objects
            for contact_data in contacts_data:
                contact_type_name = contact_data["contact_type"]
                contact_type, created = ContactType.objects.get_or_create(contact_type=contact_type_name)
                SubjectContact.objects.create(contact=contact_data["contact"], contact_type=contact_type, subject_id=subject)

            # Serialize the subject and its related data
            serialized_subject = CreateSubjectSerializer(instance=subject)

            return Response(serialized_subject.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditSubjectView(APIView):
    def post(self, request, subject_id, format=None):
        try:
            subject = Subject.objects.get(subject_id=subject_id)
        except Subject.DoesNotExist:
            return Response({"error": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EditSubjectSerializer(subject, data=request.data, partial=True)

        if serializer.is_valid():
            # Extract the contacts data from the request
            contacts_data = serializer.validated_data.pop('contacts', [])

            # Update the Subject object
            serializer.update(subject, serializer.validated_data)

            # Create or update the associated SubjectContact objects
            for contact_data in contacts_data:
                contact_type_name = contact_data["contact_type"]
                contact_type, created = ContactType.objects.get_or_create(contact_type=contact_type_name)
                subject_contact, created = SubjectContact.objects.get_or_create(
                    contact=contact_data["contact"],
                    contact_type=contact_type,
                    subject_id=subject
                )

            # Serialize the subject and its related data
            serialized_subject = EditSubjectSerializer(instance=subject)

            return Response(serialized_subject.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


