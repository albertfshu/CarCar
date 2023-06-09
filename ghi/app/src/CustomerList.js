import React, { useState, useEffect } from 'react';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCustomers(data.customers);
        } else {
          console.log('Failed to fetch customers');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <h2>Customers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CustomerList;
