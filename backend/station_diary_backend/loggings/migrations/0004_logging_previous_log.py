# Generated by Django 4.2.4 on 2023-09-09 13:37

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
from ..models import Logging

def get_default_previous_log():
    # Replace this with the logic to get the default previous log value
    # For example, if you want to set it to the first log in the database:
    return Logging.objects.first()


class Migration(migrations.Migration):

    dependencies = [
        ('loggings', '0003_rename_time_logging_log_time_logging_log_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='logging',
            name='previous_log',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING,
                to='loggings.logging',
                default=get_default_previous_log,  # Comment this line
            ),
            preserve_default=False,
        ),
    ]
