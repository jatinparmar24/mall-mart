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


# for add to cart

class Cart(models.Model):
    user = models.CharField(max_length=100)
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True, null=True)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.item}"


# for movie

class Movie(models.Model):
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    show_time = models.CharField(max_length=100)
    poster_url = models.URLField()
    trailer_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# for moviebooking details


class MovieBooking(models.Model):
    movie_title = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    seat = models.CharField(max_length=50, blank=True)
    seat_count = models.PositiveIntegerField(default=1, blank=True, null=True)
    row_type = models.CharField(max_length=50, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, blank=True, null=True)
    show_time = models.CharField(max_length=50, blank=True)
    language = models.CharField(max_length=50, blank=True)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.movie_title} - {self.email}"

