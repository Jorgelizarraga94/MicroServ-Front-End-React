import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import apiClient from '../api/apiClient';



const CartPage = () => {

    const navigate = useNavigate();

    const { user } = useAuth0();
    
    const { getAccessTokenSilently } = useAuth0();

    const { cart, cartId, setCart, removeFromCart } = useContext(CartContext);

    const realizarCompra = async () => {

        
        // 1. Lanzamos el SweetAlert de confirmación
        const result = await Swal.fire({
            title: '¿Confirmar compra?',
            text: "Se procesará el pedido con los productos seleccionados.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar'
        });

        // 2. Si el usuario cancela, no hacemos nada
        if (!result.isConfirmed) return;

        const token = await getAccessTokenSilently();

        // 1. Guardamos la promesa LIMPIA de axios
        const miPromesa = apiClient.post(
            `/sale-service/sale/createSale/${user.sub}/${cartId}`,
            {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2. Pasamos ESA promesa al toast
        toast.promise(miPromesa, {
            loading: 'Procesando venta...',
            success: '¡Compra realizada con éxito!',
            error: 'Error al procesar la venta.',
        });

        // 3. Ejecutamos las acciones después de que la promesa se resuelva
        miPromesa.then(() => {
            setCart([]);
            navigate('/');
        }).catch(err => {
            console.error("Error en la compra:", err);
        });
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
                                    <td>
                                    <button className="btn btn-danger btn-sm"onClick={() => removeFromCart(item.productId)} // Llamamos a la función
                                    >Eliminar
                                    </button></td>
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