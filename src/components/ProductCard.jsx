const ProductCard = ({ product }) => {
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
        <p className="card-text">Precio: ${product.precio}</p>
        <button className="btn btn-success">Agregar al Carrito</button>
      </div>
    </div>
  );
};
export default ProductCard;