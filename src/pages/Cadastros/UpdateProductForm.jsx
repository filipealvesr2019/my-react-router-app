import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ productId }) => {
  const [product, setProduct] = useState({
    // Initialize your product state with default values
    name: '',
    price: 0,
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch the existing product data when the component mounts
    axios.get(`http://localhost:3001/products/${productId}`)
      .then(response => {
        // Set the product state with existing data
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a PUT request to update the product
    axios.put(`http://localhost:3001/products/${productId}`, product)
      .then(response => {
        console.log('Product updated successfully:', response.data);
        // Handle success as needed (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error updating product:', error);
        // Handle error as needed (e.g., show an error message)
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      {/* Add other form fields as needed */}
      <br />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default ProductForm;
