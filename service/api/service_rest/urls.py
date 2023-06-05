from django.urls import path

from .views import api_list_technicians

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_technicians"),
]
