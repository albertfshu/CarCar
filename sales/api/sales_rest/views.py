from django.shortcuts import get_object_or_404
from .models import Salesperson, AutomobileVO, Customer, Sale
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import (
    SalespersonEncoder,
    SalespersonDetailEncoder,
    CustomerEncoder,
    CustomerDetailEncoder,
    SaleListEncoder,
    SaleDetailEncoder,
    AutomobileVOListEncoder
)


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {'salespeople': salespeople},
            encoder=SalespersonEncoder, safe=False
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
        if count > 0:
            return JsonResponse({"message": "Salesperson has been deleted successfully"}, status=200)
        else:
            return JsonResponse({"message": "Salesperson not found"}, status=404)
    else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=id).update(**content)
        salespeople = Salesperson.objects.get(id=id)
        return JsonResponse(
            salespeople, encoder=SalespersonDetailEncoder, safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder=CustomerEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer, encoder=CustomerDetailEncoder, safe=False
        )


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
        if count > 0:
            return JsonResponse({"message": "Customer has been deleted successfuly"}, status=200)
        else:
            return JsonResponse({"message": "Customer not found"}, status=404)
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer, encoder=CustomerDetailEncoder, safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales}, encoder=SaleDetailEncoder, safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content['automobile'] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "No Automobile/Invalid Automobile ID"}, status=404)
        try:
            salesperson_id = content['salesperson']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Salesperson not found"}, status=404)
        try:
            customer_id = content['customer']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer not found"}, status=404)

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
        if count > 0:
            return JsonResponse({"message" : "Sale has been deleted successfully"}, status=200)
        else:
            return JsonResponse({"message": "Sale not found"}, status=404)
    else:
        content = json.loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale, encoder=SaleListEncoder, safe=False
        )
