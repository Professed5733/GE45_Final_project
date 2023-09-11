from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework import status
from django.shortcuts import render
from .models import Sector, Shift, Deployment
from users.models import PoliceStation, Account
from .serializers import SectorSerializer, ShiftSerializer, CreateDeploymentSerializer, EditDeploymentSerializer, GetDeploymentSerializer
import json

# Create your views here.
class seedBase(APIView):
    def post(self, request):
        shifts_to_add = [
            {
                'shift': 'Shift 1',
                'start_time': '08:00:00',
                'end_time': '20:00:00',
            },
            {
                'shift': 'Shift 2',
                'start_time': '20:00:00',
                'end_time': '08:00:00',
            },
            {
                'shift': 'Office Hours',
                'start_time': '09:00:00',
                'end_time': '18:00:00',
            },
        ]
        for shift_data in shifts_to_add:
            if not Shift.objects.filter(shift=shift_data['shift']).exists():
                shift = Shift(
                    shift=shift_data['shift'],
                    start_time=shift_data['start_time'],
                    end_time=shift_data['end_time']
                )
                shift.save()

        sectors_to_add = [
            {
                'sector': 'J5R1',
                'station': PoliceStation.objects.get(station="Nanyang Neighbourhood Police Centre"),
                'description': 'Jurong West Avenue 5, Jurong West Street 75, Jurong West Street 81, Jurong West Street 92',
            },
            {
                'sector': 'J5R2',
                'station': PoliceStation.objects.get(station="Nanyang Neighbourhood Police Centre"),
                'description': 'International Road, Upper Jurong Road, Boon Lay Way',
            },
            {
                'sector': 'D1R1',
                'station': PoliceStation.objects.get(station="Clementi Neighbourhood Police Centre"),
                'description': 'Clementi Ave 4, Clementi Ave 5, Clementi Ave 1, Clementi Ave 3',
            },
            {
                'sector': 'D1R2',
                'station': PoliceStation.objects.get(station="Clementi Neighbourhood Police Centre"),
                'description': 'Dover Road, Dover Avenue, Ulu Pandan Road, Holland Road',
            },
        ]
        for sector_data in sectors_to_add:
            if not Sector.objects.filter(sector=sector_data['sector']).exists():
                sector = Sector(
                    sector=sector_data['sector'],
                    station=sector_data['station'],  # Use the correct field name
                    description=sector_data['description']
                )
                sector.save()

        return Response({"message": "Initial deployment data seeding complete"}, status=status.HTTP_201_CREATED)

class DataListView(APIView):
    def get(self, request, data_type):
        if data_type == "sector":
            sector = Sector.objects.all()
            serializer = SectorSerializer(sector, many=True)
        elif data_type == "shift":
            shift = Shift.objects.all()
            serializer = ShiftSerializer(shift, many=True)
        else:
            return Response({"error": "Invalid data type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateDeploymentView(APIView):
    def put(self, request, format=None):
        serializer = CreateDeploymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditDeploymentView(APIView):
    def post(self, request, deployment_id, format=None):
        try:
            deployment = Deployment.objects.get(deployment_id=deployment_id)
        except Deployment.DoesNotExist:
            return Response({"error": "Deployment not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EditDeploymentSerializer(deployment, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetDeploymentsWithFilterView(APIView):
    def post(self, request, format=None):
        # Parse the JSON data from the request body
        try:
            filter_data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data in the request body"}, status=400)

        # Get filter criteria from the parsed JSON data
        shift = filter_data.get("shift", "")
        sector = filter_data.get("sector", "")
        is_active = filter_data.get("is_active", "")
        date = filter_data.get("date", "")
        deployment_id = filter_data.get("deployment_id", "")
        is_deleted = filter_data.get("is_deleted", "false")
        users = filter_data.get("users", [])

        is_deleted = is_deleted.lower() == 'true'

        # Build a queryset based on the filter criteria
        queryset = Deployment.objects.all()

        if shift:
            queryset = queryset.filter(shift__shift=shift)

        if sector:
            queryset = queryset.filter(sector__sector=sector)

        if is_active:
            # 'true' or 'false' are passed as strings, so we need to convert them to boolean
            is_active = is_active.lower() == 'true'
            queryset = queryset.filter(is_active=is_active)

        if date:
            queryset = queryset.filter(date=date)

        if deployment_id:
            queryset = queryset.filter(deployment_id=deployment_id)

        queryset = queryset.filter(is_deleted=is_deleted)

        if users:
            # Use the '__in' filter to find deployments that include any of the specified users
            queryset = queryset.filter(users__in=users)

        # If no filter inputs are provided, return all records
        if not filter_data:
            queryset = queryset.filter(is_deleted=False)

        # Serialize the queryset results
        serializer = GetDeploymentSerializer(queryset, many=True)
        return Response(serializer.data)

class DeleteDeployment(APIView):
    def post(self, request, deployment_id):
        try:
            deployment = Deployment.objects.get(deployment_id=deployment_id)
        except Deployment.DoesNotExist:
            return Response({"error": "Deployment not found"}, status=status.HTTP_404_NOT_FOUND)

        # Set the 'is_deleted' attribute to True
        deployment.is_deleted = True
        deployment.save()

        return Response({"message": "Deployment set as deleted"}, status=status.HTTP_200_OK)
