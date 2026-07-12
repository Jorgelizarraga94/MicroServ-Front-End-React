const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Precio: ${product.precio}</p>
        <button className="btn btn-success">Agregar al Carrito</button>
      </div>
    </div>
  );
};
export default ProductCard;