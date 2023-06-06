import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/technicians" className="nav-link" aria-current="page">Technicians</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/technicians/create" className="nav-link" aria-current="page">Add a Technician</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/appointments/create" className="nav-link" aria-current="page">Create a Service Appointment</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="appointments/history" className="nav-link" aria-current="page">Service History</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
