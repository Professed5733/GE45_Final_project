from django.db import models
from deployments.models import Deployment
import uuid
# Create your models here.

class Tencode(models.Model):
    tencode = models.CharField(max_length=255, primary_key=True)
    description = models.CharField(max_length=255)
    def __str__(self):
        return self.tencode

class PINType(models.Model):
    PIN_Type = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.PIN_Type

class ContactType(models.Model):
    contact_type = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.contact_type

class Subject(models.Model):
    subject_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    PIN = models.CharField(max_length=255)
    PIN_type = models.ForeignKey(PINType, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)

    def __str__(self):
        return self.subject_id
class SubjectContact(models.Model):
    contact = models.CharField(max_length=255, primary_key=True)
    contact_type = models.ForeignKey(ContactType, on_delete=models.CASCADE)
    subject_id = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return self.contact

class Logging(models.Model):
    logging_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deployment = models.ForeignKey(Deployment, on_delete=models.CASCADE)
    tencode = models.ForeignKey(Tencode, on_delete=models.CASCADE)
    time = models.TimeField()
    current_location = models.CharField(max_length=255)
    destination_location = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    details = models.TextField()

    def __str__(self):
        return self.logging_id
