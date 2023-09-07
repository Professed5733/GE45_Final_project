from django.contrib import admin
from .models import Shift, Sector

class ShiftAdmin(admin.ModelAdmin):
    list_display = ('shift', 'start_time', 'end_time')
    search_fields = ('shift',)
    list_filter = ('start_time', 'end_time')
    ordering = ('shift',)
    fieldsets = (
        (None, {'fields': ('shift', 'start_time', 'end_time')}),
    )

class SectorAdmin(admin.ModelAdmin):
    list_display = ('sector', 'station', 'description')
    search_fields = ('sector', 'station__station', 'description')
    list_filter = ('station',)
    ordering = ('sector',)
    fieldsets = (
        (None, {'fields': ('sector', 'station', 'description')}),
    )

admin.site.register(Shift, ShiftAdmin)
admin.site.register(Sector, SectorAdmin)
