import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-between">
              <li className="nav-item">
                <NavLink to="/manufacturers/" className="nav-link" aria-current="page">Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/manufacturers/create" className="nav-link" aria-current="page">Create a Manufacturer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/models/" className="nav-link" aria-current="page">Models</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/models/create" className="nav-link" aria-current="page">Create a Model</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/automobiles/" className="nav-link" aria-current="page">Automobiles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/automobiles/create" className="nav-link" aria-current="page">Create an Automobile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/technicians/" className="nav-link" aria-current="page">Technicians</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/technicians/create" className="nav-link" aria-current="page">Add a Technician</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/appointments/create" className="nav-link" aria-current="page">Create a Service Appointment</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav2" aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav2">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-between">
              <li className="nav-item">
                <NavLink to="/appointments/" className="nav-link" aria-current="page">Service Appointments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/appointments/history" className="nav-link" aria-current="page">Service History</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/salespeople/">Salespeople</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/salespeople/create/">Add a Salesperson</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customers/">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customers/create/">Add a Customer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/">Sales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/create/">Add a Sale</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/history/">Salesperson History</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
