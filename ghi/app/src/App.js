import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehiclesList from './VehicleModels';
import VehicleModelForm from './VehicleModelForm';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';
import TechnicianList from './TechniciansList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
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
          <Route index path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/models" element={<VehiclesList />} />
          <Route path="models/create" element={<VehicleModelForm />} />
          <Route path="/automobiles" element={<AutomobilesList />} />
          <Route path="automobiles/create" element={<AutomobileForm />} />
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistory />} />
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
