from django.shortcuts import render, get_object_or_404
from .models import Salesperson, AutomobileVO, Customer, Sale
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import decimal


# Create your views here.
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



@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {'salespeople': salespeople},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson, encoder=SalespersonDetailEncoder, safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salespeople(request, id):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.get(id=id)
            return JsonResponse(
                salespeople, encoder=SalespersonDetailEncoder, safe=False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "No salespeople here listed"}, status=404
            )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=id).update(**content)
        salespeople = Salesperson.objects.get(id=id)
        return JsonResponse(
            salespeople, encoder=SalespersonDetailEncoder, safe=False
        )

    # elif request.method == "POST":
    #     content = json.loads(request.body)
    #     Salesperson.objects.create(
    #         first_name=content['first_name'],
    #         last_name=content['last_name'],
    #         employee_id=content['employee_id'],
    #     )
    #     return JsonResponse(
    #         {"message": "Salesperson created successfully"},
    #         status=200
    #     )
    # else:
    #     return JsonResponse(
    #         {"message": "Not allowed"},
    #         status=405
    #     )


# @require_http_methods(["DELETE"])
# def api_delete_salesperson(request, salesperson_id):
#     salesperson = get_object_or_404(Salesperson, id=salesperson_id)
#     if request.method == "DELETE":
#         salesperson.delete()
#         return JsonResponse(
#             {"message": "The salesperson has been deleted successfuly"},
#             status=200

#         )
#     else:
#         return JsonResponse(
#             {"message": "Not allowed"},
#             status=405
#         )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer, encoder=CustomerDetailEncoder, safe=False
        )
    # elif request.method == "POST":
    #     content = json.loads(request.body)
    #     customer = Customer.objects.create(
    #         first_name=content['first_name'],
    #         last_name=content['last_name'],
    #         address=content['address'],
    #         phone_number=content['phone_number']
    #     )
    #     return JsonResponse(
    #         {"id": customer.id}
    #     )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer, encoder=CustomerDetailEncoder, safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer is not found"}, status=404
            )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0}, {"message": "Customer has been deleted successfully"}, status=200)
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer, encoder=CustomerDetailEncoder, safe=False
        )


# @require_http_methods(["DELETE"])
# def api_delete_customer(request, customer_id):
#     try:
#         customer = Customer.objects.get(id=customer_id)
#         customer.delete()
#         return JsonResponse(
#             {"message": "Customer has been deleted successfully"}, status=200
#         )
#     except Customer.DoesNotExist:
#         return JsonResponse(
#             {"message": "Customer not found"}, status=404
#         )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales}, encoder=SaleDetailEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content['automobile'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"Error Message": "No Automobile/Invalid Automobile ID"}, status=404
            )
        try:
            salesperson_id = content['salesperson']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"Error Message": "There are no salespeople"}, status=404
            )
        try:
            customer_id = content['customer']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"Error Message": "There are no Customers"}, status=404,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale, encoder=SaleDetailEncoder, safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale, encoder=SaleListEncoder, safe=False
            )

        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No sale listed"}, status=404
            )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale, encoder=SaleListEncoder, safe=False
        )


# def api_delete_sale(request, sale_id):
#     try:
#         sale = Sale.objects.get(id=sale_id)
#         sale.delete()
#         return JsonResponse(
#             {"message": "sale has been deleted"}, status=200)
#     except Sale.DoesNotExist:
#         return JsonResponse(
#             {"message": "Sale not found"}, status=404
#         )





# def api_list_sales(request):
#     if request.method == "GET":
#         sales = Sale.objects.all()
#         sales_data = {
#             'sales': [
#             {
#                 'automobile_id': sale.automobile_id,
#                 'salesperson_id': sale.salesperson_id,
#                 'customer_id': sale.customer_id,
#                 'price': float(sale.price),
#             }
#             for sale in sales
#         ]
#         }

#         return JsonResponse(sales_data)
#     elif request.method == "POST":
#         content = json.loads(request.body)

#         try:
#             automobile = AutomobileVO.objects.get(id=content['automobile_vin'], sold=False)
#         except AutomobileVO.DoesNotExist:
#             return JsonResponse(
#                 {"Error": "Invalid Automobile ID"}, status=400
#             )
#         sale = Sale.objects.create(
#             automobile_id=content['automobile_id'],
#             salesperson_id=content['salesperson_id'],
#             customer_id=content['customer_id'],
#             price=content['price']
#             )
#         automobile.sold = True
#         automobile.save()
#         return JsonResponse(
#             {"id": sale.id}, status=200)


# @require_http_methods(["GET", "POST"])
# def api_list_sales(request):
#     if request.method == "GET":
#         sales = Sale.objects.all()
#         return JsonResponse(
#             {"sales": sales}, encoder=SaleListEncoder
#         )
#     else:
#         content = json.loads(request.body)
#         try:
#             automobile_vin = content["automobile"]
#             automobile = AutomobileVO.objects.get(vin=automobile_vin)
#             content["automobile"] = automobile
#         except AutomobileVO.DoesNotExist:
#             return JsonResponse(
#                 {"message": "No Automobile"},
#                 status=404,
#             )
#         return JsonResponse(
#             automobile, encoder=AutomobileVOListEncoder, safe=False
#         )
#         try:
#             salespeople_id = content["salespeople"]
#             salespeople = Salespeople.objects.get(id=salespeople_id)
#             content["salespeople"] = salespeople
#         except Salespeople.DoesNotExist:
#             return JsonResponse(
#                 {"message": "No Salespeople"},
#                 status=404,
#             )
#         return JsonResponse(
#             salespeople, encoder=SalesPeopleDetailEncoder, safe=False
#         )
#         try:
#             customer_id = content["customer"]
#             customer = Customer.objects.get(id=customer_id)
#             content["customer"] = customer
#         except Customer.DoesNotExist:
#             return JsonResponse(
#                 {"message": "No Customer"},
#                 status=404,
#             )
#         sale = Sale.objects.create(**content)
#         return JsonResponse(
#             sale, encoder=SaleDetailEncoder, safe=False
#         )





    #     if automobile_vo_id is not None:
    #         salespeople = Salesperson.objects.filter(automobile=automobile_vo_id)
    #     else:
    #         salespeople = Salesperson.objects.all()
    #     return JsonResponse(
    #         {'salespeople': salespeople},
    #         encoder=SalespersonEncoder,
    #     )
    # else:
    #     content = json.loads(request.body)
    #     try:
    #         automobile_href = content['automobile']
    #         automobile = AutomobileVO.objects.get(import_href=automobile_href)
    #         content['automobile'] = automobile
    #     except AutomobileVO.DoesNotExist:
    #         return JsonResponse(
    #             {"message": "Invalid ID"},
    #             status=404,
    #         )
    #     salesperson = Salesperson.objects.create(**content)
    #     return JsonResponse(
    #         salesperson,
    #         encoder=SalespersonEncoder,
    #         safe=False,
    #     )
