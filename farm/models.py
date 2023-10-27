from django.db import models
import accounts

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

    farmer = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE
    )  # The farmer planning the activity
    activity_type = models.CharField(
        max_length=20, choices=ACTIVITY_CHOICES
    )  # Type of activity
    date = models.DateField()  # Date for the activity
    time = models.TimeField()  # Time for the activity
    resources_required = (
        models.TextField()
    )  # Description of resources required (e.g., 10 pangas)
    notes = models.TextField(blank=True, null=True)  # Additional notes or instructions

    def __str__(self):
        return f"{self.activity_type} by {self.farmer.username} on {self.date} at {self.time}"


# Model for Livestock
class Livestock(models.Model):
    animal_type = models.CharField(max_length=100)
    produce = models.ForeignKey("Produce", on_delete=models.CASCADE)
    frequency = models.CharField(max_length=100)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)

    def __str__(self):
        return self.animal_type


# Model for Crop
class Crop(models.Model):
    crop_type = models.CharField(max_length=100)
    produce = models.ForeignKey("Produce", on_delete=models.CASCADE)
    frequency = models.CharField(max_length=100)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE)

    def __str__(self):
        return self.crop_type


# Model for Produce
class Produce(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="produce_images/", blank=True, null=True)

    def __str__(self):
        return self.name


# Model for Service
class Service(models.Model):
    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    name = models.CharField(max_length=255)
    farmer = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE
    )  # The farmer booking the service
    cost = models.DecimalField(max_digits=10, decimal_places=2)  # Cost of the service
    date = models.DateField()  # Date when the service will be done
    time = models.TimeField()  # Time of the day when the service will be done
    notes = models.TextField(blank=True, null=True)  # Additional notes or instructions
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="Pending"
    )  # Status of the service

    def __str__(self):
        return f"{self.service_type} for {self.farmer.name} on {self.date} at {self.time} - Status: {self.status}"


class Question(models.Model):
    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Answered", "Answered"),
    )

    question_text = models.TextField()
    farmer = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE
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
        'accounts.UserAccount', on_delete=models.CASCADE
    )  # The expert who answered the question
    answer_text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True)  # Date and time of the answer

    def __str__(self):
        return f"Answer by {self.expert.username}"
