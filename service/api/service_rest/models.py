from django.db import models
from django.urls import reverse

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


class Status(models.Model):

    id = models.PositiveBigIntegerField(primary_key=True)
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "statuses"


class Appointment(models.Model):

    @classmethod
    def create(cls, **content):
        content["status"] = Status.objects.get(name="created")
        appointment = cls(**content)
        appointment.save()
        return appointment

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=150)

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
        null=True,
    )

    status = models.ForeignKey(
        Status,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def finish(self):
        status = Status.objects.get(name="finished")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="canceled")
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_show_appointments", kwargs={"id": self.id})

    def __str__(self):
        return self.vin

    class Meta:
        ordering = ("-date_time",)
