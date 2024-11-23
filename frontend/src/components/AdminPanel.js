// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err); // Log the full error for more insight
      setError('Failed to load products');
    }
  };

  useEffect(() => {
 
    fetchProducts();
  }, []);

  
  const handleAddProduct = async () => {


    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.imageUrl); // Ensure this is the same field name as used in multer
  
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imageUrl) {
      console.error("Please fill in all fields.");
      return;
    }

    
    try {
      await axios.post('http://localhost:5000/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`/api/product/${id}`);
    fetchProducts(); // Refresh the product list
  };

  const handleUpdateAvailability = async (id, available) => {
    await axios.patch(`/api/product/${id}/availability`, { available });
    fetchProducts(); // Refresh the product list
  };

  const handleHideProduct = async (id) => {
    await axios.patch(`/api/product/${id}/hide`);
    fetchProducts(); // Refresh the product list
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add New Product</h3>
        <input type="text" placeholder="Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="text" placeholder="Description" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input type="number" placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="file" onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.files[0] })} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <h3>Current Products</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price}
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            <button onClick={() => handleUpdateAvailability(product._id, !product.available)}>
              {product.available ? 'Set Unavailable' : 'Set Available'}
            </button>
            <button onClick={() => handleHideProduct(product._id)}>Hide</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
