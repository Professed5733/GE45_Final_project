from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, PoliceStation

class AccountAdmin(UserAdmin):

    list_display = ('email', 'full_name', 'rank', 'role', 'station', 'date_joined', 'last_login', 'is_staff', 'is_admin', 'is_superuser')
    search_fields = ('email', 'full_name')
    readonly_fields = ('user_id', 'date_joined', 'last_login')
    ordering = ('email', )
    filter_horizontal = ()
    list_filter = ('rank', 'role', 'station')
    fieldsets = (
        (None, {'fields': ('email', 'full_name', 'user_id')}),
        ('Permissions', {'fields': ('rank', 'role', 'station', 'is_staff', 'is_admin', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'rank', 'role', 'station', 'password1', 'password2', 'is_staff', 'is_admin', 'is_superuser'),
        }),
    )

class PoliceStationAdmin(admin.ModelAdmin):
    list_display = ('station', 'division')
    search_fields = ('station', 'division')
    ordering = ('station',)

    fieldsets = (
        (None, {'fields': ('station', 'division')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('station', 'division'),
        }),
    )


admin.site.register(Account, AccountAdmin)
admin.site.register(PoliceStation, PoliceStationAdmin)
