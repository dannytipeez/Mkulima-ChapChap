from django.views import View  # Import the View class

from django.contrib.auth.tokens import default_token_generator
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.http import urlsafe_base64_decode
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.debug import sensitive_post_parameters
from django.utils.encoding import force_str
from accounts.models import UserAccount
from rest_framework import generics
from .serializers import ActiveUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProfileDataSerializer


@method_decorator(csrf_exempt, name='dispatch')
class CustomActivationView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = UserAccount.objects.get(id=uid)
        except (TypeError, ValueError, OverflowError, UserAccount.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, 'accounts/activation_success.html')  # Render the activation success template
        else:
            return HttpResponse("Activation link is invalid or has expired.")

class UserListView(generics.ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = ActiveUserSerializer


class ActiveUserListView(generics.ListAPIView):
    queryset = UserAccount.objects.filter(is_active=True)
    serializer_class = ActiveUserSerializer


class ProfileDataAPIView(APIView):
    def get(self, request):
        user = request.user  # Assuming the user is authenticated

        serializer = ProfileDataSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)