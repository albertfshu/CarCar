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
    <div>
      <h1>Sales</h1>
      <table>
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer Name</th>
            <th>Automobile VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => {
            console.log(sale)
            console.log(sale.salesperson)
            console.log(sale.customer)
            return(
            <tr key={sale.id}>
              <td>{sale.salesperson_id}</td>
              <td>{sale.salesperson_name}</td>
              <td>{sale.customer_id}</td>
              <td>{sale.automobile_id}</td>
              <td>${sale.price}</td>
            </tr>
            )
})}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPage;
