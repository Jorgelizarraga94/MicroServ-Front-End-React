import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import CartPage from '../pages/CartPage';
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
    // 1. Mueve el hook AQUÍ DENTRO
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const namespace = 'https://mi-tienda-app.com/roles';
    const roles = user?.[namespace] || [];
    const isAdmin = roles.includes('admin');


    return (
        <nav className="navbar mb-4" style={{ backgroundColor: '#0088b1' }}>
            <div className="container">
                <Link className="navbar-brand text-white" to="/">
                    <img src={logo} alt="Logo" style={{ height: '40px', width: '70px' }} />
                </Link>
                
                <div className="d-flex">
                    <Link className="nav-link text-white mx-2" to="/">Inicio</Link>
                    {/* Solo mostramos el Panel si es ADMIN */}
                    {isAuthenticated && isAdmin && (
                        <Link className="nav-link text-white" to="/dashboard">Panel de Control</Link>
                    )}
                    {/* Solo mostramos estos si está autenticado */}
                    {isAuthenticated && (
                        <>
                            <Link className="nav-link text-white" to="/cart">
                                <i className="bi bi-cart-check-fill"></i>
                            </Link>
                            <Link className="nav-link text-white" to="/sales">Ventas</Link>
                        </>
                    )}
                </div>

                <div>
                    {/* 2. Operador ternario corregido */}
                    {!isAuthenticated ? (
                        <button onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
                    ) : (
                        <>
                            <p className="text-white">Hola, {user.name}</p>
                            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;