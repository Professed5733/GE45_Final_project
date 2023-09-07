# Generated by Django 4.2.4 on 2023-09-07 06:41

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('deployments', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactType',
            fields=[
                ('contact_type', models.CharField(max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='PINType',
            fields=[
                ('PIN_Type', models.CharField(max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('subject_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('PIN', models.CharField(max_length=255)),
                ('details', models.TextField()),
                ('PIN_type', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='loggings.pintype')),
            ],
        ),
        migrations.CreateModel(
            name='SubjectStatus',
            fields=[
                ('subject_status', models.CharField(max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Tencode',
            fields=[
                ('tencode', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SubjectContact',
            fields=[
                ('contact', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('contact_type', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='loggings.contacttype')),
                ('subject_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='loggings.subject')),
            ],
        ),
        migrations.AddField(
            model_name='subject',
            name='subject_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='loggings.subjectstatus'),
        ),
        migrations.CreateModel(
            name='Logging',
            fields=[
                ('logging_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('time', models.TimeField()),
                ('current_location', models.CharField(max_length=255)),
                ('destination_location', models.CharField(max_length=255)),
                ('details', models.TextField()),
                ('deployment', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='deployments.deployment')),
                ('subject', models.ManyToManyField(to='loggings.subject')),
                ('tencode', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='loggings.tencode')),
            ],
        ),
    ]
