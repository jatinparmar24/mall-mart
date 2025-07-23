from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import LMSUserSerializer,LoginSerializer

@api_view(['POST'])
def signup_view(request):
    serializer = LMSUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'msg': 'Signup successful'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
