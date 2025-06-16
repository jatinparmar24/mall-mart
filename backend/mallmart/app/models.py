from django.db import models

class UserAccount(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=10, unique=True)
    age = models.PositiveIntegerField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
