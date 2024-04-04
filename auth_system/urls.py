from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import CustomActivationView


from django.contrib import admin


from rest_framework import permissions
import accounts, farm
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="MkulimaChapChap API",
        default_version='v1',
        description="This MkulimaChapChap API v1 includes all endpoints for accessing services for MkulimaChapChap(FMS) platform",
        terms_of_service="https://www.MkulimaChapChap.com/terms/",
        contact=openapi.Contact(email="mkulimachapchap@gmail.com"),
        license=openapi.License(name="N/A"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

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
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
