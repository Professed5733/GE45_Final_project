from django.shortcuts import render
from django.http import HttpResponse
from .models import Rank, Role, PoliceStation, Division, Account
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import DivisionSerializer, RankSerializer, RoleSerializer, PoliceStationSerializer, ChangePasswordSerializer, AccountSerializer
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
import json

# Create your views here.

class seedBase(APIView):
    def post(self, request):
        ranks_to_add = ['SERGENT', 'SENIOR STAFF SERGENT', 'STATION INSPECTOR', 'INSPECTOR', 'ASSISTANT SUPERINTENDENT OF POLICE', 'DEPUTY SUPERINTENDENT OF POLICE', 'SUPERINTENDENT OF POLICE', 'DEPUTY ASSISTANT COMMISSIONER OF POLICE', 'ASSISTANT COMMISSIONER OF POLICE', 'SENIOR ASSISTANT COMMISSIONER OF POLICE', 'DEPUTY COMMISSIONER OF POLICE', 'COMMISSIONER OF POLICE']
        for rank_name in ranks_to_add:
            if not Rank.objects.filter(rank=rank_name).exists():
                rank = Rank(rank=rank_name)
                rank.save()

        roles_to_add = ['OFFICE HOURS', 'PATROL OFFICER', 'DEPUTY TEAM LEADER', 'TEAM LEADER']
        for role_name in roles_to_add:
            if not Role.objects.filter(role=role_name).exists():
                role = Role(role=role_name)
                role.save()

        division_to_add = ['Ang Mo Kio', 'Bedok', 'Central', 'Clementi', 'Jurong', 'Tanglin', 'Woodlands']
        for division_name in division_to_add:
            if not Division.objects.filter(division=division_name).exists():
                division = Division(division=division_name)
                division.save()

        station_to_division = {
            'Bedok Division Headquarters': 'Bedok',
            'Bedok Neighbourhood Police Centre': 'Bedok',
            'Changi Neighbourhood Police Centre': 'Bedok',
            'Ang Mo Kio Division Headquarters': 'Ang Mo Kio',
            'Ang Mo Kio North Neighbourhood Police Centre': 'Ang Mo Kio',
            'Serangoon Neighbourhood Police Centre': 'Ang Mo Kio',
            'Central Division Headquarters': 'Central',
            'Bukit Merah East Neighbourhood Police Centre': 'Central',
            'Marina Bay Neighbourhood Police Centre': 'Central',
            'Clementi Division Headquarters': 'Clementi',
            'Clementi Neighbourhood Police Centre': 'Clementi',
            'Bukit Merah West Neighbourhood Police Centre': 'Clementi',
            'Jurong Division Headquarters': 'Jurong',
            'Nanyang Neighbourhood Police Centre': 'Jurong',
            'Bukit Batok Neighbourhood Police Centre': 'Jurong',
            'Tanglin Division Headquarters': 'Tanglin',
            'Kampong Java Neighbourhood Police Centre': 'Tanglin',
            'Bishan Neighbourhood Police Centre': 'Tanglin',
            'Woodlands Division Headquarters': 'Woodlands',
            'Woodlands West Neighbourhood Police Centre': 'Woodlands',
            'Woodlands East Neighbourhood Police Centre': 'Woodlands',
        }

        for station_name, division_name in station_to_division.items():
            division, created = Division.objects.get_or_create(division=division_name)
            if not PoliceStation.objects.filter(station=station_name).exists():
                station = PoliceStation(station=station_name, division=division)
                station.save()

        return Response({"message": "Initial data seeding complete"}, status=status.HTTP_201_CREATED)

class DataListView(APIView):
    def get(self, request, data_type):
        if data_type == "divisions":
            divisions = Division.objects.all()
            serializer = DivisionSerializer(divisions, many=True)
        elif data_type == "stations":
            stations = PoliceStation.objects.all()
            serializer = PoliceStationSerializer(stations, many=True)
        elif data_type == "roles":
            roles = Role.objects.all()
            serializer = RoleSerializer(roles, many=True)
        elif data_type == "ranks":
            ranks = Rank.objects.all()
            serializer = RankSerializer(ranks, many=True)
        else:
            return Response({"error": "Invalid data type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['rank'] = user.rank_id
        token['role'] = user.role_id
        token['station'] = user.station_id

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user

            # Check if the old password is correct
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({'detail': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

            # Set the new password
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomFilterAPIView(APIView):
    def post(self, request, format=None):
        # Parse the JSON data from the request body
        try:
            filter_data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data in the request body"}, status=400)

        # Get filter criteria from the parsed JSON data
        email_contains = filter_data.get("email_contains", "")
        full_name_contains = filter_data.get("full_name_contains", "")
        rank_id = filter_data.get("rank_id", None)
        role_id = filter_data.get("role_id", None)
        station_id = filter_data.get("station_id", None)

        # Build a queryset based on the filter criteria
        queryset = Account.objects.all()

        if email_contains:
            queryset = queryset.filter(email__icontains=email_contains)

        if full_name_contains:
            queryset = queryset.filter(full_name__icontains=full_name_contains)

        if rank_id is not None:
            queryset = queryset.filter(rank_id=rank_id)

        if role_id is not None:
            queryset = queryset.filter(role_id=role_id)

        if station_id is not None:
            queryset = queryset.filter(station_id=station_id)

        # Serialize the queryset results
        serializer = AccountSerializer(queryset, many=True)
        return Response(serializer.data)
