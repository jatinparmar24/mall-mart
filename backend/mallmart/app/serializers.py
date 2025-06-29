from rest_framework import serializers
from .models import UserAccount,Purchase,Cart,Movie,MovieBooking,DiceGameScore,TicTacToeScore,QuizQuestion,GuessNumberScore

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'



class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

# for add to cart

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


# for movie
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


# for movie booking
class MovieBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieBooking
        fields = '__all__'



class DiceGameScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiceGameScore
        fields = "__all__"


class TicTacToeScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicTacToeScore
        fields = '__all__'


class GuessNumberScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuessNumberScore
        fields = '__all__'



class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'options']
