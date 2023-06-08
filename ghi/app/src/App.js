import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesperson from './AddSalesperson';
import SalespeopleList from './SalespeopleList';
import CustomerList from './CustomerList';
import RecordSaleForm from './RecordSaleForm';
import SalesPage from './SalesPage';
import SalespersonHistory from './SalespersonHistory'
import AddCustomer from './AddCustomer';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople/create" element={<AddSalesperson />} />
          <Route path="salespeople" element={<SalespeopleList />} />
          <Route path="customers/create" element={<AddCustomer />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="sales/create" element={<RecordSaleForm />} />
          <Route path="sales/" element={<SalesPage />} />
          <Route path="sales/history" element={<SalespersonHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
