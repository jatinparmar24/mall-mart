from django.db import models

# Create your models here.

class LMSUser(models.Model):
    username=models.CharField(max_length=50)
    useremail=models.EmailField(unique=True)
    usercontact=models.IntegerField(unique=True)
    userpass=models.CharField(max_length=50)

    def __str__(self):
        return self.useremail
    

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    thumbnail = models.URLField()  
    video_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class Enrollment(models.Model):
    user = models.ForeignKey(LMSUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.useremail} enrolled in {self.course.name}"
