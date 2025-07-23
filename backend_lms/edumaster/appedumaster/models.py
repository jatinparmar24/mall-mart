from django.db import models

# Create your models here.

class LMSUser(models.Model):
    username=models.CharField(max_length=50)
    useremail=models.EmailField(unique=True)
    usercontact=models.IntegerField(unique=True)
    userpass=models.CharField(max_length=50)

    def __str__(self):
        return self.useremail