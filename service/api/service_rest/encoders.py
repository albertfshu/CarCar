from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment, Status


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
        ]


class StatusEncoder(ModelEncoder):
    model = Status
    properties = ["name"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "vin",
        "customer",
        "id",
    ]

    encoders = {
        "technician": TechnicianListEncoder(),
        }

    def get_extra_data(self, o):
        return {
            "technician": f'{o.technician.first_name} {o.technician.last_name}',
            "status": o.status.name
            }
