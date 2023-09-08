from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render
from .models import Sector, Shift
from users.models import PoliceStation
from .serializers import SectorSerializer, ShiftSerializer

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
