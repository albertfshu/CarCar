from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import AutomobileVODetailEncoder, TechnicianListEncoder, TechnicianDetailEncoder, AppointmentListEncoder
from .models import AutomobileVO, Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_list_technicians():
