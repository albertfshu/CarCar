from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    # AutomobileVODetailEncoder,
    # TechnicianListEncoder,
    # TechnicianDetailEncoder,
    AppointmentListEncoder,
    )


from .models import Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(pk=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=404,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )
