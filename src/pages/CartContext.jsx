import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null); 

  const loadCart = async (id = cartId) => {
    try {
      const res = await axios.get(`http://localhost:8080/cart-service/cart/${id}`);
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

  const addToCart = async (product, cant) => {
    // 1. Definimos la lógica como una promesa para toast.promise
    const addProductPromise = (async () => {
        let currentId = cartId;
        
        // Si no tenemos ID, creamos el carrito
        if (!currentId) {
            const res = await axios.post('http://localhost:8080/cart-service/cart/create');
            currentId = res.data.id;
            setCartId(currentId);
        }

        // Realizamos la petición de agregar
        await axios.post('http://localhost:8080/cart-service/cart/add', {
            cartId: currentId,
            productId: product.id,
            cant: cant
        });
        await new Promise(resolve => setTimeout(resolve, 300));
        
        await loadCart(currentId); // Recargamos el carrito tras el éxito
    })();

    // 2. Usamos toast.promise para manejar los estados
    toast.promise(addProductPromise, {
        loading: 'Agregando al carrito...',
        success: '¡Producto agregado con éxito!',
        error: 'No se pudo agregar el producto. Inténtalo de nuevo.',
    });
};

const removeFromCart = async (productId) => {
    try {
      console.log("Intentando eliminar. cartId actual es:", cartId);
    console.log("Producto a eliminar:", productId);
        // Llamada al backend para eliminar el producto del carrito específico
        await axios.delete(`http://localhost:8080/cart-service/cart/delete/${cartId}/${productId}`);
        
        // Recargamos el carrito tras eliminar
        await new Promise(resolve => setTimeout(resolve, 100));
        await loadCart();
        
        toast.success('Producto eliminado del carrito');
        console.log("Intentando eliminar. cartId actual es:", cartId);
    } catch (error) {
        console.error("Error al eliminar:", error);
        toast.error('No se pudo eliminar el producto');
    }
};

  
  return (
    <CartContext.Provider value={{ cart, addToCart, cartId, setCartId, setCart ,loadCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;