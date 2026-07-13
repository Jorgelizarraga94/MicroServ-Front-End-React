
import { useState } from 'react';
import axios from 'axios';

const ControlPanel = () => {
  const [product, setProduct] = useState({ name: '', marca: '', precio: '', photo: '' });

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mi_tienda_preset'); // El que creaste en Cloudinary

    // Subir a Cloudinary
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/b0cc3n9e/image/upload', 
      formData
    );
    
    // Guardamos la URL que nos devuelve Cloudinary en nuestro estado
    setProduct({ ...product, photo: res.data.secure_url });
  };

  const saveProduct = async () => {
    await axios.post('http://localhost:8080/product-service/product/create', product);
    alert("Producto guardado con éxito!");
  };

  return (
    <div className="container mt-4">
      <h3>Subir nuevo producto</h3>
      <input type="file" onChange={handleImageUpload} className="form-control mb-2" />
      <input className="form-control mb-2" placeholder="Nombre" onChange={e => setProduct({...product, name: e.target.value})} />
      <input className="form-control mb-2" placeholder="Marca" onChange={e => setProduct({...product, marca: e.target.value})} />
      <input className="form-control mb-2" placeholder="Precio" onChange={e => setProduct({...product, precio: e.target.value})} />
      <button onClick={saveProduct} className="btn btn-success">Guardar</button>
    </div>
  );
};
export default ControlPanel;