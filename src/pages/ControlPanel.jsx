
import { useState } from 'react';
import axios from 'axios';

const ControlPanel = () => {
  const [product, setProduct] = useState({ name: '', precio: '', imageUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llamada a tu microservicio para guardar
    await axios.post('http://localhost:8080/product-service/product/create', product);
    alert("Producto guardado");
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Nombre" onChange={e => setProduct({...product, name: e.target.value})} />
        <input className="form-control mb-2" placeholder="Precio" onChange={e => setProduct({...product, precio: e.target.value})} />
        <input className="form-control mb-2" placeholder="URL de la Imagen" onChange={e => setProduct({...product, imageUrl: e.target.value})} />
        <button className="btn btn-primary">Guardar Producto</button>
      </form>
    </div>
  );
};
export default ControlPanel;