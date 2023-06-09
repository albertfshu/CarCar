# CarCar

Team:

* Eric - Service Microservice
* Albert - Sales Microservice

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice is responsible for managing automobile sales and their integration with the inventry. It allows the user to record sales transactions, manage salespeople and customers, and also track sales history.
These are the models that are included: Salesperson, Customer, Sale, AutomobileVO.
The automobile sales microservice integrated with the Inventory microservice to ensure that only available and unsnold automobiles are included in the sales transactions. This integration helps maintain accurate inventory records and prevents the sales of cars that have not been sold or are not in inventory.
We utilize the vin field to validate the availability and sold status of the automobile when processing the sale. This helps ensure consistency with the data and reliability between the two microservices.
