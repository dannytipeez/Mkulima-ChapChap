from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import CustomActivationView

from django.contrib import admin

import accounts

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    # path("auth/", include('djoser.urls.auth')),
    path(
        "activate/<str:uidb64>/<str:token>/",
        CustomActivationView.as_view(),
        name="activate",
    ),
    path("users/", include("accounts.urls"), name="users"),
]

# urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
