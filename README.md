# CarCar

Team:

* Eric - Service Microservice
* Albert - Sales Microservice

## Design

## Service microservice

The service microservice allow for creating technicians and appointments while listing both and being able to filter through the appointments list based on the vin number of the appointment and allows for assigning a status to the appointments. In order to get information from the inventory microservice we use a poller which is implemented but only for demonstration and grading purposes. The AutomobileVO data is being recieved but unused in this microservice as I opted to have my automobile data fetched directly from the inventory microservice through React front end to verify the VIP status. I opted for this way because I felt it would fetch data faster than a 60 second timed poller and I wanted more practice with front end work. The other thing to note is in the Aappointment model I set the status property to default a "created" value that way every time something is posted it will create a status with a "created" value assigned to it. Later I create finished and canceled functions to save the new state when the put request is called (SIDE NOTE: Originally I made the status property a foreign key and Status was a model which had 1:created 2:finished 3:canceled which worked, but required the user to input the id into the JSON body to create an appointment so I defaulted the value to 1 in the front end and everything worked fine.). The status modification improves the UI experience as users are able to assign appointment statuses. All view functions contain 404 status if errors occur to improve code readability.
## Sales microservice

The sales microservice is responsible for managing automobile sales and their integration with the inventry. It allows the user to record sales transactions, manage salespeople and customers, and also track sales history.
These are the models that are included: Salesperson, Customer, Sale, AutomobileVO.
The automobile sales microservice integrated with the Inventory microservice to ensure that only available and unsnold automobiles are included in the sales transactions. This integration helps maintain accurate inventory records and prevents the sales of cars that have not been sold or are not in inventory.
We utilize the vin field to validate the availability and sold status of the automobile when processing the sale. This helps ensure consistency with the data and reliability between the two microservices.
