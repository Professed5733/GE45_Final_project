# Generated by Django 4.2.4 on 2023-09-09 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deployments', '0003_alter_deployment_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='deployment',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
