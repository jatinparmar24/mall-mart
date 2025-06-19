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



class DiceGameScore(models.Model):
    player1 = models.CharField(max_length=100)
    player2 = models.CharField(max_length=100)
    score1 = models.IntegerField()
    score2 = models.IntegerField()
    winner = models.CharField(max_length=100)
    date_played = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.winner} won Dice Game on {self.date_played.strftime('%Y-%m-%d')}"



from django.contrib.auth import get_user_model

User = get_user_model()

class UserGameProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_wins = models.IntegerField(default=0)
    spin_unlocked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - Wins: {self.total_wins} - Spin: {'Yes' if self.spin_unlocked else 'No'}"
