from django.db import models
import accounts
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from datetime import datetime, timedelta


# Model for Farm
class Farm(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    county = models.CharField(max_length=100)  # Field for County
    sub_county = models.CharField(max_length=100)  # Field for Sub-County
    farm_size = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


# Model for Farm Activity
class FarmActivity(models.Model):
    ACTIVITY_CHOICES = (
        ("Planting", "Planting"),
        ("Ploughing", "Ploughing"),
        ("Weeding", "Weeding"),
        # Add more activity types as needed
    )

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    farmer = models.ForeignKey(
        "accounts.UserAccount", on_delete=models.CASCADE, null=True, blank=True
    )  # The farmer planning the activity
    activity_type = models.CharField(
        max_length=20, choices=ACTIVITY_CHOICES
    )  # Type of activity
    date = models.DateField()  # Date for the activity
    time = models.TimeField()  # Time for the activity
    resources_required = models.TextField(
        null=True, blank=True
    )  # Description of resources required (e.g., 10 pangas)
    notes = models.TextField(blank=True, null=True)  # Additional notes or instructions
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="Pending"
    )  # Status of the service

    def __str__(self):
        return f"{self.activity_type} by {self.farmer.username} on {self.date} at {self.time}"


# Model for LivestockFF
class Livestock(models.Model):
    animal_type = models.CharField(max_length=100)
    number = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to="livestock_images/", blank=True, null=True)
    frequency = models.CharField(max_length=100)

    def __str__(self):
        return self.animal_type


# Model for Crop
class Crop(models.Model):
    crop_type = models.CharField(max_length=100)
    number = models.CharField(max_length=100, null=True, blank=True)
    frequency = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.crop_type


# Model for Produce
class Produce(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="produce_images/", blank=True, null=True)

    # Generic foreign key to link to either Livestock or Crop
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=False
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    producer = GenericForeignKey("content_type", "object_id")

    def __str__(self):
        return self.name


# Model for Service
class Service(models.Model):
    SERVICE_CHOICES = (
        ("Planting", "Planting"),
        ("Ploughing", "Ploughing"),
        ("Weeding", "Weeding"),
        # Add more activity types as needed
    )

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    AVAILABILITY_CHOICES = (
        ("Available", "Available"),
        ("Not Available", "Not Available"),
    )

    name = models.CharField(max_length=255, null=True, blank=True)
    farmer = models.ForeignKey(
        "accounts.UserAccount",
        on_delete=models.CASCADE,
        related_name="booked_services",
        null=True,
        blank=True,
    )
    service_type = models.CharField(
        max_length=20, choices=SERVICE_CHOICES, null=True, blank=False
    )
    service_provider = models.ForeignKey(
        "accounts.ServiceProviderProfile",
        on_delete=models.CASCADE,
        related_name="services_offered",
        null=True,
        blank=False,
    )
    cost = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )  # Cost of the service
    date = models.DateField(null=True, blank=True)  # Date when the service will be done
    time = models.TimeField(
        null=True, blank=True
    )  # Time of the day when the service will be done
    notes = models.TextField(blank=True, null=True)  # Additional notes or instructions
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="Pending", null=True, blank=True
    )
    availability_status = models.CharField(
        max_length=20,
        choices=AVAILABILITY_CHOICES,
        default="Not Available",
        null=True,
        blank=True,
    )  # Status of the service

    def __str__(self):
        return f"{self.name} for {self.farmer.username} on {self.date} at {self.time} - Status: {self.status}"


class Question(models.Model):
    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Answered", "Answered"),
    )

    question_text = models.TextField()
    farmer = models.ForeignKey(
        "accounts.UserAccount", on_delete=models.CASCADE
    )  # The farmer who asked the question
    date_time = models.DateTimeField(auto_now_add=True)  # Date and time of the question
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="Pending"
    )  # Status of the question
    answer = models.ForeignKey(
        "Answer", on_delete=models.CASCADE, blank=True, null=True
    )

    def __str__(self):
        return f"Question by {self.farmer.username} - {self.status}"


# Model for Answer
class Answer(models.Model):
    expert = models.ForeignKey(
        "accounts.UserAccount", on_delete=models.CASCADE
    )  # The expert who answered the question
    answer_text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)  # Date and time of the answer

    def __str__(self):
        return f"Answer by {self.expert.username}"


class Store(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)
    capacity = models.PositiveIntegerField()
    used_capacity = models.PositiveIntegerField()

    def update_capacity(self):
        # Calculate the capacity based on the number of tools
        tool_count_good = Tool.objects.filter(condition="Good").count()
        tool_count_fair = Tool.objects.filter(
            condition="Needs Maintenance"
        ).count()  # Adjust the condition as needed
        self.used_capacity = tool_count_fair + tool_count_good
        self.save()

    def __str__(self):
        return self.farm.name


class Storage(models.Model):
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)
    capacity = models.PositiveIntegerField()
    used_capacity = models.PositiveIntegerField()


class Tool(models.Model):
    CONDITION_CHOICES = (
        ("Good", "Good"),
        ("Needs Maintenance", "Needs Maintenance"),
        ("Under Maintenance", "Under Maintenance"),
    )

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    condition = models.CharField(
        max_length=20, choices=CONDITION_CHOICES, default="Good"
    )
    image = models.ImageField(upload_to="tools_images/", blank=True, null=True)
    last_maintenance_date = models.DateField(null=True, blank=False)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Calculate the number of days since the last maintenance
        if self.last_maintenance_date:
            days_since_maintenance = (
                datetime.now().date() - self.last_maintenance_date
            ).days
            if days_since_maintenance <= 14:
                self.condition = "Good"
            else:
                self.condition = "Needs Maintenance"
        super(Tool, self).save(*args, **kwargs)
