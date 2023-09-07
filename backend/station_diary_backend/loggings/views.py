from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import SubjectStatus, Tencode, PINType, ContactType

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
