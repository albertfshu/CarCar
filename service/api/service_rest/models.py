from django.db import models
# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField()

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=200)
    status = models.BooleanField()
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=150)

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
        null=True,
    )
