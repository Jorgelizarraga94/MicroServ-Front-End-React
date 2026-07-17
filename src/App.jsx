// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/ControlPanel'; // Tu componente de tablero de control
import HomePage from './pages/HomePage';
import Carrousel from './components/Carrousel';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;