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
