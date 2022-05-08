from django.db import models


class Invoice(models.Model):
    cname = models.CharField(max_length=20)
    phone = models.CharField(max_length=10, null=True)
    number_plate = models.CharField(max_length=10)
    items = models.TextField()

# Create your models here.
