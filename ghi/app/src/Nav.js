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
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/">Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/create/">Add a Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/create/">Add a Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/create/">Add a sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/history/">Salesperson History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
