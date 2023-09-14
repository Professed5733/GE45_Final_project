from rest_framework import permissions

class IsTeamLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'TEAM LEADER'

class IsTeamORDeputyTeamLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.role in ["TEAM LEADER", "DEPUTY TEAM LEADER"]
