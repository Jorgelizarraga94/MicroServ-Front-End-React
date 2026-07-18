import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const Footer = () => {
    return (
        /* Cambiamos nav por footer y quitamos las clases de Bootstrap navbar */
        <footer style={{ backgroundColor: '#000000', padding: '10px 0', marginTop: 'auto' }}>
            <div className="container">
                <Link className="text-white" to="/">
                    <img src={logo} alt="Logo" style={{ height: '40px', width: '150px' }}  />
                </Link>
                <p className=" text-white mt-3">&copy; 2026 Microserv. Todos los derechos reservados.</p>
                <p className="text-white">Contacto: <a href="mailto:info@mi-tienda-app.com" className="text-white">info@mi-tienda-app.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;