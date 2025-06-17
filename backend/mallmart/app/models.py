from django.db import models

# for new user to website
class UserAccount(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=10, unique=True)
    age = models.PositiveIntegerField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username


# for shop purchase details

class Purchase(models.Model):
    user = models.CharField(max_length=100)  # Store user name or ID
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.item}"
