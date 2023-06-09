# Generated by Django 4.0.3 on 2023-06-09 19:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=200, unique=True)),
                ('sold', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('employee_id', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('reason', models.CharField(max_length=200)),
                ('status', models.CharField(default='created', max_length=20)),
                ('vin', models.CharField(max_length=50)),
                ('customer', models.CharField(max_length=150)),
                ('technician', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='technician', to='service_rest.technician')),
            ],
            options={
                'ordering': ('-date_time',),
            },
        ),
    ]
