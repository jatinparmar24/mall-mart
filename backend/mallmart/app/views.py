from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,viewsets,generics
from .models import UserAccount,Purchase,Cart,Movie
from .serializers import UserAccountSerializer,PurchaseSerializer,CartSerializer,MovieSerializer
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


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user')
        if user:
            return Cart.objects.filter(user=user)
        return super().get_queryset()


class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all().order_by('-created_at')
    serializer_class = MovieSerializer
