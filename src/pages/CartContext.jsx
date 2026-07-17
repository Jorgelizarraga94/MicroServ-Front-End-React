import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null); // <--- NUEVO: Guardamos el ID aquí

  const loadCart = async () => {
    try {
      // Intentamos cargar un ID que ya conocemos (ej. el 12 fijo o uno que guardaste)
      const res = await axios.get(`http://localhost:8080/cart-service/cart/${cartId}`);
      setCart(res.data.items || []);
    } catch (error) {
      console.error("No se pudo cargar el carrito:", error);
      if (error.response?.status === 404) {
        // Creamos el carrito SI Y SOLO SI no existe
        const nuevoCarrito = await axios.post('http://localhost:8080/cart-service/cart/create');
        setCartId(nuevoCarrito.data.id); // <--- Guardamos el ID real que nos dio el backend
        setCart([]);
      }
    }
  };

  const addToCart = async (product , cant) => {
    // Si todavía no tenemos cartId, lo creamos antes de agregar el producto
    let currentId = cartId;
    if (!currentId) {
        const res = await axios.post('http://localhost:8080/cart-service/cart/create');
        currentId = res.data.id;
        setCartId(currentId);
    }

    // Ahora SÍ tenemos un ID seguro para usar
    await axios.post('http://localhost:8080/cart-service/cart/add', {
      cartId: currentId,
      productId: product.id,
      cant: cant
    });
    console.log(`Producto ${product.name} agregado al carrito con ID ${currentId}`);
    loadCart(); 
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, cartId }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;