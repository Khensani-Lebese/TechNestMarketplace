// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPanel= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPanel;
