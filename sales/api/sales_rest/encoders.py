from .models import Salesperson, AutomobileVO, Customer, Sale
import decimal
from common.json import ModelEncoder


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold']


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ['first_name', 'last_name', 'employee_id', 'id']


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = ['first_name', 'last_name', 'employee_id']


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ['first_name', 'last_name', 'address', 'phone_number', 'id']


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = ['first_name', 'last_name', 'address', 'phone_number']


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = ['automobile', 'salesperson', 'customer', 'price', 'id']


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = ['automobile', 'salesperson', 'customer', 'price']
    encoders = {
        'automobile': AutomobileVOListEncoder(),
        'salesperson': SalespersonDetailEncoder(),
        'customer': CustomerDetailEncoder()
    }

    def get_extra_data(self, o):
        extra_data = {}
        if hasattr(o, 'price') and isinstance(o.price, decimal.Decimal):
            extra_data['price'] = str(o.price)
        return extra_data
