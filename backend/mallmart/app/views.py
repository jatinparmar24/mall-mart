from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserAccount
from .serializers import UserAccountSerializer

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
        
        print("Incoming data:", request.data)


        # Only save required fields
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


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = UserAccount.objects.get(email=email, password=password)
            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }, status=200)
        except UserAccount.DoesNotExist:
            return Response({"error": "Invalid email or password"}, status=400)
