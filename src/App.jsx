// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/ControlPanel'; // Tu componente de tablero de control
import HomePage from './pages/HomePage';
import SalesPage from './pages/SalesPage';
import Carrousel from './components/Carrousel';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) return <div>Cargando...</div>;
  // Obtenemos los roles del namespace que configuramos en la Action
  const roles = user ? user['https://mi-tienda-app.com/roles'] : [];
  const isAdmin = roles && roles.includes('admin');

  // Si no está autenticado, va al login. 
  // Si no es admin, lo redirige al Home.
  if (!isAuthenticated) return <LoginButton />; // O simplemente null
  if (!isAdmin) return <Navigate to="/" />; 

  return children;
};

const ProtectedPage = withAuthenticationRequired(CartPage,{
  onRedirecting: () => <div>Redirigiendo a login...</div>,
});

function App() {
  return(
    <Router>
      <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Toaster position="top-right" /> {/* Posición de las alertas */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<ProtectedPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </Router>
    
  );
}

export default App;