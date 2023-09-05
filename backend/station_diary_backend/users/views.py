from django.shortcuts import render
from django.http import HttpResponse
from .models import Rank, Role, PoliceStation, Division

# Create your views here.

def seedBase(request):
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

    return HttpResponse('seedBase_complete')
