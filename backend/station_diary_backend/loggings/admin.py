from django.contrib import admin
from .models import Tencode, PINType, ContactType, SubjectStatus

class TencodeAdmin(admin.ModelAdmin):
    list_display = ('tencode', 'description')
    search_fields = ('tencode', 'description')
    ordering = ('tencode',)

class PINTypeAdmin(admin.ModelAdmin):
    list_display = ('PIN_Type',)
    search_fields = ('PIN_Type',)
    ordering = ('PIN_Type',)

class ContactTypeAdmin(admin.ModelAdmin):
    list_display = ('contact_type',)
    search_fields = ('contact_type',)
    ordering = ('contact_type',)

class SubjectStatusAdmin(admin.ModelAdmin):
    list_display = ('subject_status',)
    search_fields = ('subject_status',)
    ordering = ('subject_status',)

admin.site.register(Tencode, TencodeAdmin)
admin.site.register(PINType, PINTypeAdmin)
admin.site.register(ContactType, ContactTypeAdmin)
admin.site.register(SubjectStatus, SubjectStatusAdmin)
