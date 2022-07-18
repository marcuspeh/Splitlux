from django.urls import path, include

from core.views import UpdateProfile, UpdateProfilePicture

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('updateProfilePic/', UpdateProfilePicture.as_view()),
    path('updateProfile/', UpdateProfile.as_view()),
]