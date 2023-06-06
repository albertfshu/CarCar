from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileVODetailEncoder,
    TechnicianListEncoder,
    AppointmentListEncoder,
    )


from .models import AutomobileVO, Technician, Appointment, Status


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.create(
            first_name=content["first_name"],
            last_name=content["last_name"],
            employee_id=content["employee_id"]
        )
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )
    else:
        return JsonResponse(
            {"message": "Invalid request"},
            status=404,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    try:
        appointment = Appointment.objects.all()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment"},
            status=404,
        )
    if request.method == "GET":
        return JsonResponse(
            {"appointments": appointment},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
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


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointments(request, pk):
    try:
        appointment = Appointment.objects.all()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment"},
            status=404,
        )
    if request.method == "GET":
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "status" in content:
                status = Status.objects.get(employee_id=content["status"])
                content["status"] = status
        except Status.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid status"},
                status=404,
            )
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )
