// SalesPage.js
import React, { useState, useEffect } from 'react';

function SalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
          const salesData = await response.json();
          setSales(salesData.sales);
          console.log(salesData)
        } else {
          console.log('Failed to fetch sales');
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchSales();
  }, []);

  return (
    <>
      <div>
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.salesperson.employee_id}</td>
              <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
              <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
              <td>{sale.automobile.vin}</td>
              <td>${sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default SalesPage;
