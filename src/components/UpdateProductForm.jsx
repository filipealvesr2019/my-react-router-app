import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProductForm = ({ product, onClose }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/api/admin/product/${product._id}`,
        {
          name: productName,
          price: productPrice,
          // adicione outros campos conforme necessário
        }
      );

      console.log('Produto atualizado com sucesso:', response.data);
      // Adicione qualquer lógica adicional após a atualização bem-sucedida

      // Feche o formulário de atualização
      onClose();

    } catch (error) {
      console.error('Erro ao atualizar o produto:', error.response.data.message);
      // Adicione lógica para lidar com erros, se necessário
    }
  };

  return (
    <form onSubmit={handleUpdateProduct}>
      <label>
        Product Name:
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </label>
      <br />
      <label>
        Product Price:
        <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      </label>
      <br />
      {/* Adicione outros campos conforme necessário */}
      <button type="submit">Atualizar Produto</button>
    </form>
  );
};

export default UpdateProductForm;
