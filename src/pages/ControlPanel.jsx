import { useState, useEffect } from 'react';
import axios from 'axios';

const ControlPanel = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('add');

  // Cargamos los productos al abrir el panel
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8080/product-service/product/products');
    setProducts(res.data);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item" onClick={() => setView('add')}>Agregar</button>
            <button className="list-group-item" onClick={() => setView('list')}>Productos</button>
          </div>
        </div>

        {/* Contenido Dinámico */}
        <div className="col-md-9">
          {view === 'add' ? (
            <FormularioAgregar />
          ) : (
            <TablaProductos products={products} setProducts={setProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de tabla que recibe la lista
const TablaProductos = ({ products, setProducts }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/product-service/product/delete/${id}`);
    // Esto es lo que hace la "magia": actualiza la lista al instante
    setProducts(products.filter(p => p.id !== id));
  };
  const truncateText = (text, limit) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "...";
};

  return (
    <table className="table">
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{truncateText(p.name, 100)}</td>
            <td>${p.price}</td>

            <td><button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FormularioAgregar = () => {
  const [product, setProduct] = useState({ name: '', brand: '', price: '', photo: '' });

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
      <input className="form-control mb-2" placeholder="Marca" onChange={e => setProduct({...product, brand: e.target.value})} />
      <input className="form-control mb-2" placeholder="Precio" onChange={e => setProduct({...product, price: e.target.value})} />
      <button onClick={saveProduct} className="btn btn-success">Guardar</button>
    </div>
  );
};
export default ControlPanel;