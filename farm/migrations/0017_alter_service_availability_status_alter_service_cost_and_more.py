# Generated by Django 4.2.6 on 2023-11-06 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farm', '0016_service_availability_status_alter_service_farmer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='availability_status',
            field=models.CharField(blank=True, choices=[('Available', 'Available'), ('Not Available', 'Not Available')], default='Not Available', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='service',
            name='cost',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='service',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='service',
            name='status',
            field=models.CharField(blank=True, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')], default='Pending', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='service',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]