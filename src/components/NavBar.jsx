import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../assets/images/logo.jpg';

const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    
    // Tu lógica de admin
    const namespace = 'https://mi-tienda-app.com/roles';
    const roles = user?.[namespace] || [];
    const isAdmin = roles.includes('admin');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-4" style={{ backgroundColor: '#000000' }}>
            {/* El 'container' es el que centra el contenido y le da el ancho uniforme */}
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" style={{ height: '40px', width: '150px' }} />
                </Link>

                {/* Botón para menú en móviles */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Enlaces a la izquierda */}
                    <ul className="navbar-nav">
                      {isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Inicio</Link>
                        </li>
                      )}
                        {isAuthenticated && isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/dashboard">Panel de Control</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/sales">Mis compras</Link>
                            </li>
                        )}
                    </ul>

                    
                    <form class="d-flex mx-auto" role="search" style={{ width: '100%', maxWidth: '400px' }}>
                      <input class="form-control me-auto" type="search" placeholder="Search" aria-label="Search"/>
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <div className="d-flex align-items-center">
                        {isAuthenticated && (
                            <Link className="nav-link text-white me-3" to="/cart">
                                <i className="bi bi-cart-check-fill" style={{ fontSize: '1.5rem' }}></i>
                            </Link>
                        )}
                        
                        {!isAuthenticated ? (
                            <button className="btn btn-outline-light btn-sm" onClick={() => loginWithRedirect()}>
                                Iniciar Sesión
                            </button>
                        ) : (
                            <div className="dropdown">
                                <button className="btn btn-link nav-link text-white dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    <img src={user?.picture} alt={user?.name} style={{ width: '30px', borderRadius: '50%', marginRight: '8px' }} />
                                    {user?.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button className="dropdown-item" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;