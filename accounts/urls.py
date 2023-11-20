from django.urls import path
from .views import ActiveUserListView, UserListView, ProfileDataAPIView

urlpatterns = [
    path("", UserListView.as_view()),
    path("active/", ActiveUserListView.as_view(), name="active-user-list"),
    path('profile_data/', ProfileDataAPIView.as_view(), name='get_profile_data'),
]
