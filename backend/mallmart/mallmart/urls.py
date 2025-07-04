"""
URL configuration for mallmart project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from app.views import *

# If you're not using any ViewSets, you don't need the router.
# You can remove this if it's not being used.
router = DefaultRouter()
router.register(r'cart', CartViewSet)


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/purchases/', purchase_list_create),
    path('api/', include(router.urls)),
    path('api/cart-clear/', clear_cart),
    path('api/movies/', MovieListCreateView.as_view(), name='movie-list-create'),
    path('api/bookings/', MovieBookingCreateView.as_view(), name='movie-booking'),
    path('api/games/dice/save/', save_dice_score, name='save_dice_score'),
    path("api/save-tictactoe-score/", save_tictactoe_score),
    path("api/save-guess-score/", save_guess_score, name="save_guess_score"),
    path('api/get-quiz-questions/', get_quiz_questions), 
    path('api/check-quiz-answer/', check_quiz_answer),  
    path('api/leaderboard/', leaderboard_view),
    path('api/user-profile/<str:username>/', user_profile),
    path('api/lock-spin/<str:username>/', lock_spin),
    path('api/create-razorpay-order/', create_razorpay_order),

    





]



