import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import CartPage from '../pages/CartPage';

const Navbar = () => {
  return (
    <nav className="navbar mb-4" style={{ backgroundColor: '#0088b1' }}>
      <div className="container">
        <Link className="navbar-brand text-white" to="/"><img src={logo} alt="Logo" style={{ height: '40px', width: '70px' }} /></Link>
        <div className="d-flex">
          <Link className="nav-link text-white mx-2" to="/">Inicio</Link>
          <Link className="nav-link text-white" to="/dashboard">Tablero de Control</Link>
          <Link className="nav-link text-white" to="/cart">
            <i className="bi bi-cart-check-fill" ></i>
          </Link>
          <Link className="nav-link text-white" to="/sales">Ventas</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;