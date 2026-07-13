const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <img src={product.photo} alt={product.name}
        style={{ 
        width: '70%', 
        height: '70%', 
        objectFit: 'cover' // ¡Esto es lo que mantiene todo uniforme!
      }} className="card-img-top" />
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.marca}</p>
        <p className="card-text">${product.precio}</p>
        
        <button className="btn btn-success">Agregar al Carrito</button>
      </div>
    </div>
  );
};
export default ProductCard;