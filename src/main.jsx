import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // <--- ESTO ES LO QUE FALTA
import CartProvider from './pages/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="logintienda.us.auth0.com" // Cópialo de tu panel de Auth0
    clientId="WyonZB86X5voflJxGVE1TvUjkRhuIylR" // Cópialo de tu panel de Auth0
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://logintienda.us.auth0.com/api/v2/" // EL IDENTIFIER DE TU API EN AUTH0
    }}
  >
    <CartProvider>
    <App />
    </CartProvider>
  </Auth0Provider>
);