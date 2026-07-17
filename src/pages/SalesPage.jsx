import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const SalesPage = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            if (user?.sub) {
                const token = await getAccessTokenSilently();
                const response = await axios.get(`http://localhost:8080/sale-service/sale/getSalesByUser/${user.sub}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSales(response.data);
            }
        };
        fetchSales();
    }, [user, getAccessTokenSilently]);

    return (
        <div className="container mt-4">
            <h2>Mis Ventas</h2>
            {sales.length === 0 ? <p>No tienes ventas registradas.</p> : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover mt-3">
                        <thead className="table-light">
                            <tr>
                                <th>ID Venta</th>
                                <th>Fecha</th>
                                <th>Detalle de Productos</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => (
                                <tr key={sale.saleId}>
                                    <td className="align-middle">{sale.saleId}</td>
                                    <td className="align-middle">{sale.date}</td>
                                    
                                    {/* Nueva columna con la lista de productos */}
                                    <td>
                                        <ul className="list-unstyled mb-0">
                                            {/* Iteramos sobre los items del carrito */}
                                            {sale.cart?.items?.map((producto, index) => (
                                                <li key={index} className="border-bottom py-1">
                                                    <strong>{producto.name}</strong> <br/>
                                                    <span className="text-muted">
                                                        {producto.quantity} x ${producto.unitPrice} 
                                                        {/* Si tienes subtotal en el producto, puedes usarlo directamente */}
                                                        {' '}(Subtotal: ${(producto.quantity * producto.unitPrice).toFixed(2)})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    
                                    <td className="align-middle fw-bold text-success">
                                        ${(sale.cart?.totalPrice || 0).toFixed(2)}
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SalesPage;