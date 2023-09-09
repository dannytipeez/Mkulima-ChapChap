from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import CustomActivationView

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path('activate/<str:uidb64>/<str:token>/', CustomActivationView.as_view(), name='activate'),
]

urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
