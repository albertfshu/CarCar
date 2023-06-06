from django.contrib import admin
from .models import AutomobileVO, Status, Appointment, Technician
# Register your models here.

admin.site.register(AutomobileVO)
admin.site.register(Status)
admin.site.register(Appointment)
admin.site.register(Technician)
