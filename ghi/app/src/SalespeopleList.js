import React, { useState, useEffect } from 'react';

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([]);

    useEffect(() => {
      const fetchSalespeople = async () => {
        try {
          const response = await fetch('http://localhost:8090/api/salespeople/');

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setSalespeople(data.salespeople);
          } else {
            console.log('Failed to fetch salespeople');
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };

      fetchSalespeople();
    }, []);

  return (
    <>
    <h2>Salespeople</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople.map(salesperson => {
            return(
            <tr key={salesperson.employee_id}>
              <td>{salesperson.employee_id}</td>
              <td>{salesperson.first_name}</td>
              <td>{salesperson.last_name}</td>
            </tr>
            )
})}
        </tbody>
      </table>
    </>
  );
}

export default SalespeopleList;
