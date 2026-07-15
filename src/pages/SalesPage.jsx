import { useContext } from 'react';
import { CartContext } from '../pages/CartContext';

const SalesPage = () => {
  const { cart } = useContext(CartContext); // cart viene de tu BD

  // Función para calcular el total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.cant), 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      
      {cart.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío. ¡Sigue comprando!</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td> {/* Asegúrate de que el objeto traiga el nombre */}
                    <td>{item.cant}</td>
                    <td>${item.price}</td>
                    <td>${(item.price * item.cant).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Columna resumen */}
          <div className="col-md-4">
            <div className="card p-3">
              <h4>Resumen</h4>
              <hr />
              <h5>Total: ${calculateTotal().toFixed(2)}</h5>
              <button className="btn btn-success w-100 mt-3">Finalizar Compra</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;