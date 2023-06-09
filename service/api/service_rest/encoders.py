from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


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


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "status",
        "customer",
        "id",
    ]

    encoders = {
        "technician": TechnicianListEncoder(),
        }

    def get_extra_data(self, o):
        return {
            "technician": f'{o.technician.first_name} {o.technician.last_name}',
            }
