from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    TechnicianListEncoder,
    AppointmentListEncoder,
    )


from .models import Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    try:
        technicians = Technician.objects.all()
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid technician id"},
            status=404,
        )

    if request.method == "GET":
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )

    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician id"},
                status=404,
            )
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        if (count > 0) is False:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=404,
            )
        else:
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


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    try:
        appointment = Appointment.objects.all()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid value"},
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
        appointment = Appointment.objects.filter(id=pk)
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
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        if (count > 0) is False:
            return JsonResponse(
                {"message": "Invalid appointment id"},
                status=404,
            )
        else:
            return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.finish()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment id"},
            status=404
        )
    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel()
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid appointment id"},
            status=404
        )

    return JsonResponse(
        appointment,
        encoder=AppointmentListEncoder,
        safe=False,
    )
