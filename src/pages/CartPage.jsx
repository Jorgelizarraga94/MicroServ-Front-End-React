import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const CartPage = () => {
  const { cart, cartId } = useContext(CartContext); // Obtenemos el carrito del contexto

  const realizarCompra = async () => {
    try {
        console.log("El valor de cartId antes de la petición es:", cartId);
        // Asegúrate de usar el endpoint correcto que definiste en tu microservicio de ventas
        const response = await axios.post(`http://localhost:8080/sale-service/sale/createSale/${cartId}`);
        
        if (response.status === 200 || response.status === 201) {
            alert("¡Compra realizada con éxito!");
            // Opcional: Redirigir o limpiar el carrito
        }
    } catch (error) {
        console.error("Error al procesar la venta:", error);
        alert("Hubo un error al realizar la compra.");
    }
};

  return (
    <div className="container mt-4">
      <h2>Tu Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <table className="table">
                        <thead>
                            <tr>
                                <th>ID Producto</th>
                                <th>name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productId}</td>
                                    <td>{item.name}</td>
                                    <td>${item.unitPrice}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        <h2 className="text-center mt-4">Total: ${cart.reduce((acc, item) => acc + item.subtotal, 0)}</h2>
                        <div className="text-center">
                          <button className="btn btn-primary" onClick={realizarCompra}>
                              Realizar Compra
                          </button>
                        </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;