from django.shortcuts import render, get_object_or_404
from .models import Salesperson, AutomobileVO, Customer, Sale
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods



# Create your views here.

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ['first_name', 'last_name', 'employee_id', 'id']


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ['first_name', 'last_name', 'address', 'phone_number', 'id']


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = ['automobile', 'salesperson', 'customer', 'price']


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'sold']


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'model', 'year', 'color']


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {'salespeople': salespeople},
            encoder=SalespersonEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        Salesperson.objects.create(
            first_name=content['first_name'],
            last_name=content['last_name'],
            employee_id=content['employee_id'],
        )
        return JsonResponse(
            {"message": "Salesperson created successfully"},
            status=200
        )
    else:
        return JsonResponse(
            {"message": "Not allowed"},
            status=405

        )


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, salesperson_id):
    salesperson = get_object_or_404(Salesperson, id=salesperson_id)
    if request.method == "DELETE":
        salesperson.delete()
        return JsonResponse(
            {"message": "The salesperson has been deleted successfuly"},
            status=200

        )
    else:
        return JsonResponse(
            {"message": "Not allowed"},
            status=405
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder=CustomerEncoder
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(
            first_name=content['first_name'],
            last_name=content['last_name'],
            address=content['address'],
            phone_number=content['phone_number']
        )
        return JsonResponse(
            {"id": customer.id}
        )


@require_http_methods(["DELETE"])
def api_delete_customer(request, customer_id):
    try:
        customer = Customer.objects.get(id=customer_id)
        customer.delete()
        return JsonResponse(
            {"message": "Customer has been deleted successfully"}, status=200
        )
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Customer not found"}, status=404
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales}, encoder=SalesEncoder
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
        return JsonResponse(
            automobile, encoder=AutomobileVOListEncoder, safe=False
        )

        try:
            salesperson_id = content['salespeople']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salespeople'] = salesperson
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
            sale, encoder=SalesEncoder, safe=False
        )


def api_delete_sale(request, sale_id):
    try:
        sale = Sale.objects.get(id=sale_id)
        sale.delete()
        return JsonResponse(
            {"message": "sale has been deleted"}, status=200)
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Sale not found"}, status=404
        )





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
