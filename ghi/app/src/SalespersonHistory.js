import React, { useState, useEffect } from 'react';

function SalespersonHistory() {
  const [sales, setSales] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  const handleSalespersonChange = (event) => {
    setSelectedSalesperson(event.target.value);
  };

  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        if (selectedSalesperson) {
          const response = await fetch(`http://localhost:8090/api/salesperson/${selectedSalesperson}/sales`);
          if (response.ok) {
            const salesData = await response.json();
            setSales(salesData.sales);
          } else {
            console.log('Failed to fetch sales history');
          }
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchSalesHistory();
  }, [selectedSalesperson]);

  return (
    <>
      <h1>Salesperson History</h1>
      <div>
        <select value={selectedSalesperson} onChange={handleSalespersonChange}>
          <option value="">Choose a Salesperson</option>

        </select>
      </div>
      <div>

      </div>
    </>
  );
}


export default SalespersonHistory;
