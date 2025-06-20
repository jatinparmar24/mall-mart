from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,viewsets,generics
from .models import UserAccount,Purchase,Cart,Movie,MovieBooking,DiceGameScore,TicTacToeScore,GuessNumberScore
from .serializers import UserAccountSerializer,PurchaseSerializer,CartSerializer,MovieSerializer,MovieBookingSerializer,DiceGameScoreSerializer,TicTacToeScoreSerializer,QuizQuestionSerializer,GuessNumberScoreSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


class SignupView(APIView):
    def post(self, request):
        data = request.data
        email = data.get("email")
        username = data.get("username")
        contact = data.get("contact")
        age = int(data.get("age", 0))
        password = data.get("password")
        confirm_password = data.get("confirmPassword")

        if not email or "@" not in email:
            return Response({"error": "Invalid email"}, status=400)

        if not contact or len(contact) != 10 or contact == contact[0] * 10:
            return Response({"error": "Invalid contact"}, status=400)

        if age <= 18:
            return Response({"error": "Age must be greater than 18"}, status=400)

        if password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)

        if UserAccount.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)

        if UserAccount.objects.filter(contact=contact).exists():
            return Response({"error": "Contact already exists"}, status=400)

        serializer = UserAccountSerializer(data={
            "username": username,
            "email": email,
            "contact": contact,
            "age": age,
            "password": password
        })

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Signup successful"}, status=201)
        return Response(serializer.errors, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        try:
            user = UserAccount.objects.get(email=email)
            if user.password == password:  
                return Response({
                    "username": user.username,
                    "email": user.email
                })
            else:
                return Response({"error": "Incorrect password"}, status=400)
        except UserAccount.DoesNotExist:
            return Response({"error": "User not found"}, status=404)





@api_view(['GET', 'POST'])
def purchase_list_create(request):
    if request.method == 'GET':
        purchases = Purchase.objects.all().order_by('-date')
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

# for razor pay
@api_view(['POST'])
def create_razorpay_order(request):
    import razorpay
    from django.conf import settings

    amount = int(request.data.get("amount", 0)) * 100  # ₹ to paise
    client = razorpay.Client(auth=("rzp_test_pr99iascS1WRtU" , "UTDIzPGwICnAssu3Q3lk7zUi"))

    try:
        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })
        return Response(order)
    except Exception as e:
        return Response({"error": str(e)}, status=400)



class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user')
        if user:
            return Cart.objects.filter(user=user)
        return super().get_queryset()

@api_view(['DELETE'])
def clear_cart(request):
    user = request.query_params.get('user')
    if user:
        Cart.objects.filter(user=user).delete()
        return Response({"message": "Cart cleared."})
    return Response({"error": "User not specified"}, status=400)


# for movie
class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all().order_by('-created_at')
    serializer_class = MovieSerializer


# for moviebooking
class MovieBookingCreateView(generics.ListCreateAPIView):
    queryset = MovieBooking.objects.all().order_by('-booked_at')
    serializer_class = MovieBookingSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        movie_title = request.data.get("movie_title")
        show_time = request.data.get("show_time")

        # Check if booking already exists
        if MovieBooking.objects.filter(email=email, movie_title=movie_title, show_time=show_time).exists():
            return Response(
                {"error": "You have already booked this movie at this time."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Proceed if no duplicates
        return super().create(request, *args, **kwargs)





# to save score who get point or win

from .models import UserGameProfile

@api_view(['POST'])
def save_dice_score(request):
    serializer = DiceGameScoreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        # ✅ Track win for the winner
        winner_name = serializer.validated_data.get("winner")
        try:
            user = UserAccount.objects.filter(username=winner_name).first()
            if user:
                profile, _ = UserGameProfile.objects.get_or_create(user=user)
                profile.total_wins += 1
                if profile.total_wins >= 10:
                    profile.spin_unlocked = True
                profile.save()
        except Exception as e:
            print("Error updating dice win profile:", e)

        return Response({"message": "Score saved successfully"}, status=201)

    return Response(serializer.errors, status=400)




@api_view(["POST"])
def save_tictactoe_score(request):
    serializer = TicTacToeScoreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        player_name = serializer.validated_data.get("player")
        result = serializer.validated_data.get("result")

        if result == "win":
            try:
                user = UserAccount.objects.filter(username=player_name).first()
                if user:
                    profile, _ = UserGameProfile.objects.get_or_create(user=user)
                    profile.total_wins += 1
                    if profile.total_wins >= 10:
                        profile.spin_unlocked = True
                    profile.save()
            except Exception as e:
                print("Error updating win profile:", e)

        return Response({"message": "Score saved!"})
    return Response(serializer.errors, status=400)



# for guess number
@api_view(["POST"])
def save_guess_score(request):
    serializer = GuessNumberScoreSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        # Only track win
        if serializer.validated_data.get("result") == "win":
            player_name = serializer.validated_data.get("player")
            try:
                user = UserAccount.objects.filter(username=player_name).first()
                if user:
                    profile, _ = UserGameProfile.objects.get_or_create(user=user)
                    profile.total_wins += 1
                    if profile.total_wins >= 10:
                        profile.spin_unlocked = True
                    profile.save()
            except Exception as e:
                print("Error updating profile:", e)

        return Response({"message": "Score saved!"})
    
    return Response(serializer.errors, status=400)


# for quiz question


from .models import QuizQuestion, UserGameProfile
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(['GET'])
def get_quiz_questions(request):
    questions = QuizQuestion.objects.all()[:5]  # Send 5 questions
    serializer = QuizQuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def check_quiz_answer(request):
    try:
        question_id = request.data.get('question_id')
        selected_option = request.data.get('selected_option')

        if not question_id or not selected_option:
            return Response({'error': 'Missing data'}, status=400)

        question = QuizQuestion.objects.get(id=question_id)

        if question.answer.strip().lower() == selected_option.strip().lower():
            return Response({'correct': True})
        else:
            return Response({'correct': False})
    except QuizQuestion.DoesNotExist:
        return Response({'error': 'Question not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)



# for leader dashboard


@api_view(['GET'])
def leaderboard_view(request):
    dice_scores = DiceGameScore.objects.all().order_by('-date_played')
    ttt_scores = TicTacToeScore.objects.all().order_by('-date_played')
    guess_scores = GuessNumberScore.objects.all().order_by('-date_played')

    return Response({
        "dice": [
            {
                "player1": d.player1,
                "player2": d.player2,
                "score1": d.score1,
                "score2": d.score2,
                "winner": d.winner,
                "date": d.date_played
            } for d in dice_scores
        ],
        "tictactoe": [
            {
                "player": t.player,
                "result": t.result,
                "date": t.date_played
            } for t in ttt_scores
        ],
        "guess": [
            {
                "player": g.player,
                "result": g.result,
                "date": g.date_played
            } for g in guess_scores
        ]
    })



@api_view(['GET'])
def user_profile(request, username):
    user = UserAccount.objects.filter(username=username).first()
    profile = UserGameProfile.objects.get(user=user)
    return Response({
        "username": user.username,
        "total_wins": profile.total_wins,
        "spin_unlocked": profile.spin_unlocked
    })


@api_view(["POST"])
def lock_spin(request, username):
    try:
        user = UserAccount.objects.get(username=username)
        profile = UserGameProfile.objects.get(user=user)
        profile.spin_unlocked = False
        profile.save()
        return Response({"message": "Spin locked!"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)


