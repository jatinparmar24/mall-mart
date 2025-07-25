from rest_framework import serializers
from .models import LMSUser,Course,Enrollment


# sign up
class LMSUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LMSUser
        fields = '__all__'


# login

class LoginSerializer(serializers.Serializer):
    useremail = serializers.EmailField()
    userpass = serializers.CharField()

    def validate(self, data):
        useremail = data.get('useremail')
        userpass = data.get('userpass')

        try:
            user = LMSUser.objects.get(useremail=useremail)
        except LMSUser.DoesNotExist:
            raise serializers.ValidationError("Email not found.")

        if user.userpass != userpass:
            raise serializers.ValidationError("Incorrect password.")

        return data


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    useremail = serializers.CharField(source='user.useremail')
    username = serializers.CharField(source='user.username')
    course = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['id', 'username', 'useremail', 'course', 'enrolled_at']
