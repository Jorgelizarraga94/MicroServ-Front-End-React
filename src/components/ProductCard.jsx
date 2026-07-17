import { useState , useContext } from 'react';
import { CartContext } from '../pages/CartContext';
import { useAuth0 } from "@auth0/auth0-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [cant, setCant] = useState(1);
  const { isAuthenticated } = useAuth0();

  const handleAdd = () => {
    // Enviamos el producto y la cantidad elegida
    addToCart(product, cant); 
  };
  // Función para transformar la URL al vuelo
  const getOptimizedUrl = (url) => {
    if (!url) return "";
    // Insertamos los parámetros de transformación después de /upload/
    return url.replace("/upload/", "/upload/c_fill,w_200,h_150/");
  };
  

  const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
};
  
  return (
    <div className="card col-sm-12">
      <div style={{ height: '10rem', width: '12rem', overflow: 'hidden' }}>
        <img 
          src={getOptimizedUrl(product.photo)} // Usamos la URL optimizada
          alt={product.name}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{truncateText(product.name, 20)}</h5>
        <p className="card-text">Precio: ${product.price}</p>
        {isAuthenticated && (
        <p className="card-text">cantidad: </p>
        )}
        {isAuthenticated && (
        <input
          type="number" 
          min="1" 
          value={cant} 
          onChange={(e) => setCant(parseInt(e.target.value))} 
          style={{ width: '50px' }}
        />
        )}
        {isAuthenticated && (
        <button className="btn btn-success" onClick={() => { addToCart(product,cant)}}>Agregar al Carrito</button>
        )}
      </div>
    </div>
  );
};
export default ProductCard;