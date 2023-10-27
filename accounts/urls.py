from django.urls import path
from .views import ActiveUserListView, UserListView

urlpatterns = [
    path("", UserListView.as_view()),
    path("active/", ActiveUserListView.as_view(), name="active-user-list"),
]
