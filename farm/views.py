import openai

from django.shortcuts import render
from .filters import ServiceFilter, ProduceFilter  # Import the filter
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.contenttypes.models import ContentType
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect

'''third parties'''
from decouple import config
OPEN_AI_API_KEY = config('API_KEY')


# from braces.views import CsrfExemptMixin

# from django.views.decorators.csrf import CsrfProtectMixin

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import (
    Farm,
    FarmActivity,
    Livestock,
    Crop,
    Produce,
    Service,
    Question,
    Answer,
    Storage,
    Store,
    Tool,
)
from .serializers import (
    FarmSerializer,
    FarmActivitySerializer,
    LivestockSerializer,
    CropSerializer,
    ProduceSerializer,
    ServiceSerializer,
    QuestionSerializer,
    AnswerSerializer,
    StorageSerializer,
    StoreSerializer,
    ToolSerializer,
    ServiceBookingSerializer,
)


# crud views for livestock and crops
class LivestockListCreateView(generics.ListCreateAPIView):
    queryset = Livestock.objects.all()
    serializer_class = LivestockSerializer
    permission_classes = [IsAuthenticated]


class LivestockRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Livestock.objects.all()
    serializer_class = LivestockSerializer
    permission_classes = [IsAuthenticated]


class CropListCreateView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated]


class CropRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated]


# View for listing all farms and creating a new farm
class FarmListCreateView(generics.ListCreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [IsAuthenticated]


# View for retrieving, updating, and deleting a specific farm
class FarmRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [IsAuthenticated]


# View for listing all available services and creating a new service booking


class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "date", "cost"]
    filterset_class = ServiceFilter
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

    # def create(self, request, *args, **kwargs):
    #     # Check if the user is a service provider
    #     if request.user.role == "service_provider" or request.user.role == "admin":
    #         return super().create(request, *args, **kwargs)
    #     return Response(
    #         {"detail": "Only service providers can create services."},
    #         status=status.HTTP_403_FORBIDDEN
    # )


# class ServiceListCreateView(generics.ListCreateAPIView):
#     queryset = Service.objects.all()
#     serializer_class = ServiceSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ["status", "date", "cost"]
#     filterset_class = ServiceFilter
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         # Set the farmer booking the service to the current user
#         serializer.save()  # farmer=self.request.user


class ServiceRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_class = ServiceFilter  # Specify the filter class
    permission_classes = [IsAuthenticated]

    # def perform_update(self, serializer):
    #     # Custom logic for updating a service booking
    #     instance = serializer.save()
    #     if instance.status == "Completed":
    #         # Implement your logic for handling completed services here
    #         pass

    # def perform_destroy(self, instance):
    #     # Custom logic for canceling a service booking
    #     if instance.status == "Pending":
    #         # Implement your logic for canceling a pending service here
    #         instance.status = "Cancelled"
    #         instance.save()
    #     else:
    #         # Handle other cases as needed
    #         pass


# booking service
class ServiceBookingView(APIView):
    def post(self, request, pk):
        serializer = ServiceBookingSerializer(
            data={
                "service_id": pk,
                "date": request.data.get("date"),
                "time": request.data.get("time"),
                # "farmer": request.data.get("farmer")
            }
        )
        if serializer.is_valid():
            service_id = serializer.validated_data["service_id"]
            date = serializer.validated_data["date"]
            time = serializer.validated_data["time"]
            # farmer = serializer.validated_data["farmer"]
            try:
                service = Service.objects.get(id=service_id)
                # Check if the service is available
                if service.availability_status == "Available" and not service.farmer:
                    # Associate the service with the farmer and set date and time
                    service.farmer = request.user
                    service.date = date
                    service.time = time
                    service.status = "Pending"
                    service.availability_status = "Not Available"
                    service.save()
                    return Response(
                        "Service booked successfully", status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        "Service is not available for booking",
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except Service.DoesNotExist:
                return Response(
                    "Service does not exist", status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View for listing all farm activities and creating a new farm activity
class FarmActivityListCreateView(generics.ListCreateAPIView):
    queryset = FarmActivity.objects.all()
    serializer_class = FarmActivitySerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Check if a similar activity already exists
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        similar_activities = FarmActivity.objects.filter(
            activity_type=serializer.validated_data["activity_type"],
            date=serializer.validated_data["date"],
            time=serializer.validated_data["time"],
        )
        if similar_activities.exists():
            return Response(
                {"detail": "A similar activity is already planned."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            serializer.save()  # farmer=self.request.user
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# View for retrieving, updating, and deleting a specific farm activity
class FarmActivityRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FarmActivity.objects.all()
    serializer_class = FarmActivitySerializer
    # permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Check if a similar activity already exists
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        similar_activities = FarmActivity.objects.filter(
            activity_type=serializer.validated_data["activity_type"],
            date=serializer.validated_data["date"],
            time=serializer.validated_data["time"],
            status=serializer.validated_data["status"],
        ).exclude(
            pk=instance.pk
        )  # Exclude the current activity from the check
        if similar_activities.exists():
            return Response(
                {"detail": "A similar activity is already planned."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        # You can include a message in the response
        instance.delete()
        return Response(
            {
                "detail": f"Farm activity with ID {instance.id} and name {instance.activity_type} deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT,
        )


class ProduceListCreateView(generics.ListCreateAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "producer_type",
        "producer_id",
        "date",
        "last_days",
    ]
    filterset_class = ProduceFilter
    permission_classes = [IsAuthenticated]


class ProduceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "producer_type",
        "producer_id",
        "date",
        "last_days",
    ]
    filterset_class = ProduceFilter
    permission_classes = [IsAuthenticated]


class LivestockProduceListView(generics.ListAPIView):
    serializer_class = ProduceSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "producer_type",
        "producer_id",
        "date",
        "last_days",
    ]
    filterset_class = ProduceFilter

    def get_queryset(self):
        # Get the content type for the Livestock model
        livestock_content_type = ContentType.objects.get_for_model(Livestock)

        # Query for all produce linked to Livestock
        queryset = Produce.objects.filter(content_type=livestock_content_type)

        return queryset


class CropProduceListView(generics.ListAPIView):
    serializer_class = ProduceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the content type for the Crop model
        crop_content_type = ContentType.objects.get_for_model(Crop)

        # Query for all produce linked to Crop
        queryset = Produce.objects.filter(content_type=crop_content_type)

        return queryset


# tools and maintenance views
class ToolListCreateView(generics.ListCreateAPIView):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    permission_classes = [IsAuthenticated]


class ToolRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    permission_classes = [IsAuthenticated]


class ToolMaintenanceView(generics.UpdateAPIView):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the tool's primary key from the URL
        tool_pk = kwargs.get("pk")
        name = request.data.get("name")  # Name filter
        condition = request.data.get("condition")  # Condition filter

        # If tool_pk is provided, update tool by PK
        if tool_pk:
            try:
                instance = self.get_queryset().get(pk=tool_pk)
            except Tool.DoesNotExist:
                return Response(
                    {"message": "Tool not found"}, status=status.HTTP_404_NOT_FOUND
                )
            instance.last_maintenance_date = request.data.get("last_maintenance_date")
            instance.save()
            return Response(
                {"message": "Maintenance updated successfully"},
                status=status.HTTP_200_OK,
            )

        # If no tool_pk is provided, apply filtering (name, condition)
        queryset = self.get_queryset()
        if name:
            queryset = queryset.filter(name=name)
        if condition:
            queryset = queryset.filter(condition=condition)

        # Apply additional filters as needed
        # For example: queryset = queryset.filter(some_other_field=some_value)

        # Perform the update on the filtered queryset
        queryset.update(last_maintenance_date=request.data.get("last_maintenance_date"))

        return Response(
            {"message": "Maintenance updated for filtered tools"},
            status=status.HTTP_200_OK,
        )


# store views
class CheckStoreCapacityView(generics.ListCreateAPIView):
    store_queryset = Store.objects.all()
    store = store_queryset[0]
    available_space = store.capacity - store.used_capacity
    permission_classes = [IsAuthenticated]

    def get(
        self,
        request,
        available_space=available_space,
        used_capacity=store.used_capacity,
        *args,
        **kwargs,
    ):
        if available_space <= 0:
            return Response(
                {"message": "Store is full"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {
                "message": f"Store has ({available_space}) available space",
                "available_space": available_space,
                "used_space": used_capacity,
            },
            status=status.HTTP_200_OK,
        )


class StoreListCreateView(generics.ListCreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsAuthenticated]


class StoreRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    permission_classes = [IsAuthenticated]


# storage views
class StorageListCreateView(generics.ListCreateAPIView):
    queryset = Storage.objects.all()
    serializer_class = StorageSerializer
    permission_classes = [IsAuthenticated]


class StorageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Storage.objects.all()
    serializer_class = StorageSerializer
    permission_classes = [IsAuthenticated]


class CheckStorageCapacityView(generics.ListCreateAPIView):
    queryset = Storage.objects.all()
    serializer_class = ToolSerializer
    storage = queryset[0]
    permission_classes = [IsAuthenticated]

    def get(self, request, storage=storage, *args, **kwargs):
        available_space = storage.capacity - storage.used_capacity
        if available_space <= 0:
            return Response(
                {"message": "Storage is full"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {
                "message": f"Storage has ({available_space}) available space",
                "available_space": available_space,
                "used_space": storage.used_capacity,
            },
            status=status.HTTP_200_OK,
        )


# View for asking a question
class QuestionCreateView(generics.CreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Set the farmer asking the question to the current user
        serializer.save()  # farmer=self.request.user


class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


# View for viewing and adding answers
class AnswerView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    # permission_classes = [IsAuthenticated]


# @method_decorator(csrf_exempt, name="dispatch")
# class ChatGPTView(View):
#     def __init__(self):
#         client = OpenAI()

#     def post(self, request):
#         question = request.POST.get("question")
#         # Define your OpenAI API key
#         api_key = "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"
#         # api_key = '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' freakoutbond

#         # Make a request to the GPT-3 model
#         openai.api_key = api_key
#         response = openai.Completion.create(
#             engine="text-davinci-002",
#             prompt=f"Ask GPT-3: {question}",
#             max_tokens=50,  # Adjust the response length as needed
#         )

#         answer = response.choices[0].text

#         # Return the answer as JSON
#         return JsonResponse({"answer": answer})


# "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"
# @method_decorator(csrf_protect, name="dispatch")
class ChatGPTView(View):
    # authentication_classes = []

    def post(self, request):
        question = request.POST.get("question")

        OPEN_AI_API_KEY = config('API_KEY')

        # print("question", question)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

        # Define your OpenAI API key
        # api_key = "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"
        print(OPEN_AI_API_KEY)
        # Set up your OpenAI API key
        openai.api_key = OPEN_AI_API_KEY

        # Define the conversation as a list of messages
        conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question},
        ]

        # Make a request to the GPT-3.5-turbo model
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation,
        )

        # Extract the answer from the response
        answer = response.choices[0].message["content"]

        # Return the answer as a JSON response
        return JsonResponse({"answer": answer})
