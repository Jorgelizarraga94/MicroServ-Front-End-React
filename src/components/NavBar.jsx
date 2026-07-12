import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi Tienda</Link>
        <div className="d-flex">
          <Link className="nav-link text-white mx-2" to="/">Inicio</Link>
          <Link className="nav-link text-white" to="/dashboard">Tablero de Control</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;