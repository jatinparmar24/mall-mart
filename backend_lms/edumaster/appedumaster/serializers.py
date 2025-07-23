from rest_framework import serializers
from .models import LMSUser


# sign up
class LMSUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LMSUser
        fields = '__all__'


# login

# serializers.py

from rest_framework import serializers
from .models import LMSUser

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = LMSUser.objects.get(email=email)
        except LMSUser.DoesNotExist:
            raise serializers.ValidationError("Email not found")

        if user.password != password:
            raise serializers.ValidationError("Incorrect password")

        return data
