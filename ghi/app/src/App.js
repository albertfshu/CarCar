import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehiclesList from './VehicleModels';
import TechnicianList from './TechniciansList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/models" element={<VehiclesList />} />
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
