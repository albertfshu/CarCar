from django.urls import path

from .views import api_list_appointments

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_list_appointments"),
]
