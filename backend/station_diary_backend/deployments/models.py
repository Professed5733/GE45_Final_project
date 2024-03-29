from django.db import models
from users.models import Account, PoliceStation
import uuid


# Create your models here.

class Shift(models.Model):
    shift = models.CharField(max_length=255, primary_key=True)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.shift


class Sector(models.Model):
    sector = models.CharField(max_length=255, primary_key=True)
    station = models.ForeignKey(PoliceStation, on_delete=models.DO_NOTHING)
    description = models.TextField()

    def __str__(self):
        return self.sector

class Deployment(models.Model):
    deployment_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shift = models.ForeignKey(Shift, on_delete=models.DO_NOTHING)
    sector = models.ForeignKey(Sector, on_delete=models.DO_NOTHING)
    users = models.ManyToManyField(Account, related_name='deployments')
    is_active = models.BooleanField(default=False)
    date = models.DateField()
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.deployment_id)