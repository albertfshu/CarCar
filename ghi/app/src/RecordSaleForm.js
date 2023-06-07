import React, { useState, useEffect } from 'react';

function RecordSaleForm() {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedAutomobile, setSelectedAutomobile] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [price, setPrice] = useState('');

  const handleAutomobileChange = (event) => {
    setSelectedAutomobile(event.target.value);
  };

  const handleSalespersonChange = (event) => {
    const selectedSalespersonID = event.target.value;
    setSelectedSalesperson(selectedSalespersonID);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
        if (automobileResponse.ok) {
          const automobileData = await automobileResponse.json();
          setAutomobiles(automobileData.autos);
        } else {
          console.log('Failed to fetch Automobile');
        }

        const salespersonResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salespersonResponse.ok) {
          const salespersonData = await salespersonResponse.json();
          setSalespersons(salespersonData.salespeople);
        } else {
          console.log('Failed to fetch salesperson');
        }

        const customerResponse = await fetch('http://localhost:8090/api/customers/');
        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          setCustomers(customerData.customers);
        } else {
          console.log('Failed to fetch customers');
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      automobile: selectedAutomobile,
      salesperson: selectedSalesperson,
      customer: selectedCustomer,
      price: price,
    };

    try {
      const url = 'http://localhost:8090/api/sales/';
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const newSale = await response.json();
        console.log(newSale);
        console.log('New Sale created successfully');
        setSelectedAutomobile('');
        setSelectedSalesperson('');
        setSelectedCustomer('');
        setPrice('');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  console.log(automobiles);
  console.log(salespersons);
  console.log(customers);

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a New Sale</h1>
            <form onSubmit={handleSubmit} id="record-sale-form">
              <div className="mb-3">
                <div className="form-floating mb-3">
                  <select value={selectedAutomobile} onChange={handleAutomobileChange} className="form-select">
                    <option value="">Choose an Automobile</option>
                    {automobiles.map((automobile) => (
                      <option key={automobile.id} value={automobile.vin}>
                        {automobile.vin}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="automobile">Automobile</label>
                </div>

                <div className="form-floating mb-3">
                  <select value={selectedSalesperson} onChange={handleSalespersonChange} className="form-select">
                    <option value="">Choose a Salesperson</option>
                    {salespersons.map((salesperson) => (
                      <option key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name} {salesperson.last_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="salesperson">Salesperson</label>
                </div>

                <div className="form-floating mb-3">
                  <select value={selectedCustomer} onChange={handleCustomerChange} className="form-select">
                    <option value="">Choose a Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="customer">Customer</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handlePriceChange} placeholder="Price" required type="number" name="price" id="price" className="form-control" value={price} />
                  <label htmlFor="price">Price</label>
                </div>

                <button type="submit" className="btn btn-primary">Record Sale</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

 }

export default RecordSaleForm;
