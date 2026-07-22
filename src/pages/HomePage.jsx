import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Carrousel from '../components/Carrousel';
import apiClient from '../api/apiClient';
const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient.get('product-service/product/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    
    <div className="container">
      <Carrousel />
      <br />
      <div className="row g-4 justify-content-center">
        {products.map(p => (
          <div className="col-md-2" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;