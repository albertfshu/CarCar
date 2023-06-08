import { useEffect, useState } from 'react';

function SalespersonHistoryPage() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  const fetchSalespeople = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/salespeople/');
      if (response.ok) {
        const salespeopleData = await response.json();
        setSalespeople(salespeopleData.salespeople);
      } else {
        console.log('Failed to fetch salespeople');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const fetchSalesData = async () => {
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

  useEffect(() => {
    fetchSalespeople();
    fetchSalesData();
  }, []);

  const handleSalespersonChange = (e) => {
    setSelectedSalesperson(e.target.value);
  };
  console.log(selectedSalesperson)
  const filteredSales = sales.filter((sale) => sale.salesperson.employee_id === selectedSalesperson);

  return (
    <>
      <h1>Salesperson History</h1>
      <label htmlFor="salespersonSelect">Select Salesperson:</label>
      <select id="salespersonSelect" onChange={handleSalespersonChange}>
        <option value=""> Select Salesperson </option>
        {salespeople.map((salesperson) => (
          <option key={salesperson.employee_id} value={salesperson.employee_id}>
            {`${salesperson.first_name} ${salesperson.last_name}`}
          </option>
        ))}
      </select>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                <td>{sale.automobile.vin}</td>
                <td>${sale.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
}

export default SalespersonHistoryPage;
