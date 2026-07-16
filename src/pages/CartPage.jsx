import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cart } = useContext(CartContext); // Obtenemos el carrito del contexto

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              Producto ID: {item.productId} - Cantidad: {item.cant}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};