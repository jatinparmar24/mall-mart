from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import LMSUserSerializer,LoginSerializer,CourseSerializer,EnrollmentSerializer

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


class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    
class AddCourseView(APIView):
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Course added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnrollmentListView(APIView):
    def get(self, request):
        enrollments = Enrollment.objects.select_related('user', 'course').all()
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
