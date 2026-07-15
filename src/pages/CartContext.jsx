import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde BD al abrir la app
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const res = await axios.get('http://localhost:8080/cart-service/cart/getCarts');
    setCart(res.data);
  };

  const addToCart = async (product) => {
    // 1. Guardar en BD
    await axios.post('http://localhost:8080/cart-service/cart/add', {
    cartId: 1,
    productId: product.id,
    cant: 1
    });
    // 2. Refrescar estado local
    loadCart(); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;