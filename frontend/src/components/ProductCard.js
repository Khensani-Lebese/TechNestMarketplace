import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, onHide }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
        <button onClick={onHide} style={{ backgroundColor: 'orange', color: 'white' }}>Hide</button>
      </div>
    </div>
  );
};

export default ProductCard;
