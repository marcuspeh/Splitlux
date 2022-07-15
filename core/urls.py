from django.urls import path, include

from core.views import UpdateProfilePicture

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('updateProfilePic/', UpdateProfilePicture.as_view()),
]