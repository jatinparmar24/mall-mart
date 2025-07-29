from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView
from django.utils import timezone
from datetime import timedelta
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
        useremail = serializer.validated_data['useremail']
        user = LMSUser.objects.get(useremail=useremail)

        return Response({
            "message": "Login successful",
            "useremail": user.useremail,
        }, status=status.HTTP_200_OK)

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


@api_view(['POST'])
def enroll_course(request):
    useremail = request.data.get('useremail')
    course_id = request.data.get('course_id')

    try:
        user = LMSUser.objects.get(useremail=useremail)
        course = Course.objects.get(id=course_id)
    except LMSUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

    # Get latest enrollment (if any)
    existing_enrollment = Enrollment.objects.filter(user=user, course=course).order_by('-enrolled_at').first()

    if existing_enrollment:
        time_diff = timezone.now() - existing_enrollment.enrolled_at
        if time_diff < timedelta(days=10):
            remaining_days = 10 - time_diff.days
            return Response({
                'message': f'Already enrolled. You can re-enroll after {remaining_days} more day(s).'
            }, status=status.HTTP_200_OK)

    # Create new enrollment
    Enrollment.objects.create(user=user, course=course)
    return Response({'message': 'Enrolled successfully'}, status=status.HTTP_201_CREATED)






class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer