from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account

class AccountAdmin(UserAdmin):

    list_display = ('email', 'full_name', 'rank', 'role', 'station', 'date_joined', 'last_login', 'is_admin', 'is_superuser')
    search_fields = ('email', 'full_name')
    readonly_fields = ('user_id', 'date_joined', 'last_login')
    ordering = ('email', )
    filter_horizontal = ()
    list_filter = ('rank', 'role', 'station')
    fieldsets = (
        (None, {'fields': ('email', 'full_name', 'user_id')}),
        ('Permissions', {'fields': ('rank', 'role', 'division', 'station', 'is_admin', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'rank', 'role', 'station', 'password1', 'password2', 'is_admin', 'is_superuser'),
        }),
    )

admin.site.register(Account, AccountAdmin)
