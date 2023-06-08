from django.db import models


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Sale(models.Model):
    automobile = models.ForeignKey(
        'AutomobileVO',
        on_delete=models.CASCADE,
        null=True
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.CASCADE,
        null=True
        )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        null=True
    )
    price = models.DecimalField(max_digits=15, decimal_places=2)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin
