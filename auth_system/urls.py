from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import CustomActivationView

from django.contrib import admin

import accounts, farm

urlpatterns = [
    path('api/v1/admin/', admin.site.urls),
    path("api/v1/auth/", include("djoser.urls")),
    path("api/v1/auth/", include("djoser.urls.jwt")),
    # path("auth/", include('djoser.urls.auth')),
    path(
        "api/v1/activate/<str:uidb64>/<str:token>/",
        CustomActivationView.as_view(),
        name="activate",
    ),
    path("api/v1/users/", include("accounts.urls"), name="users"),
    path("api/v1/farm/", include("farm.urls"), name="farm_resources"),
]

# urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]