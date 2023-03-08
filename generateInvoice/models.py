from django.db import models


class Invoice(models.Model):
    customerName = models.CharField(max_length=20)
    phone = models.CharField(max_length=10, null=True)
    numberPlate = models.CharField(max_length=10)
    services = models.JSONField(default=dict)

# Create your models here.
