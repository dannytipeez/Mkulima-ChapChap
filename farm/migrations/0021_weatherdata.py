# Generated by Django 4.2.6 on 2023-11-21 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farm', '0020_alter_farmactivity_farmer_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='WeatherData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=100)),
                ('current_weather_data', models.JSONField()),
                ('forecast_data', models.JSONField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]