import { createContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null); 

  const loadCart = async (id = cartId) => {
    const token = await getAccessTokenSilently();

            const authConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    try {
      
      const res = await apiClient.get(`http://localhost:8080/cart-service/cart/${id}`,authConfig);
      setCart(res.data.items || []);
    } catch (error) {
      console.error("No se pudo cargar el carrito:", error);
      if (error.response?.status === 404) {
        // Creamos el carrito SI Y SOLO SI no existe
        const nuevoCarrito = await apiClient.post('/cart-service/cart/create');
        setCartId(nuevoCarrito.data.id); // <--- Guardamos el ID real que nos dio el backend
        setCart([]);
      }
    }
  };

  const addToCart = async (product, cant) => {
    // 1. Definimos la lógica como una promesa para toast.promise
    const addProductPromise = (async () => {
        const token = await getAccessTokenSilently();

            const authConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
        let currentId = cartId;
        
        // Si no tenemos ID, creamos el carrito
        if (!currentId) {
            const res = await apiClient.post('/cart-service/cart/create', {}, authConfig);
            currentId = res.data.id;
            setCartId(currentId);
        }

        // Realizamos la petición de agregar
        await apiClient.post('/cart-service/cart/add', {
            cartId: currentId,
            productId: product.id,
            cant: cant
        }, authConfig);

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
  const token = await getAccessTokenSilently();

            const authConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    try {
      console.log("Intentando eliminar. cartId actual es:", cartId);
    console.log("Producto a eliminar:", productId);
        // Llamada al backend para eliminar el producto del carrito específico
        await apiClient.delete(`http://localhost:8080/cart-service/cart/delete/${cartId}/${productId}`, authConfig);
        
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