import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProductForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    // Faça uma solicitação GET para obter a lista de produtos
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao obter a lista de produtos:', error.response.data.message);
        // Adicione lógica para lidar com erros, se necessário
      }
    };

    // Chame a função de busca ao montar o componente
    fetchProducts();
  }, []);

  const handleProductSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedProductId(selectedId);

    // Encontre o produto selecionado na lista de produtos
    const selectedProduct = products.find(product => product._id === selectedId);

    // Preencha os campos do formulário com os detalhes do produto selecionado
    setProductName(selectedProduct.name);
    setProductPrice(selectedProduct.price);
    // Adicione outras atribuições conforme necessário
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      // Faça a solicitação PUT para a rota de atualização
      const response = await axios.put(`http://localhost:3001/api/products/${selectedProductId}`, {
        name: productName,
        price: productPrice,
        // adicione outros campos conforme necessário
      });

      console.log('Produto atualizado com sucesso:', response.data);
      // Adicione qualquer lógica adicional após a atualização bem-sucedida

    } catch (error) {
      console.error('Erro ao atualizar o produto:', error.response.data.message);
      // Adicione lógica para lidar com erros, se necessário
    }
  };

  return (
    <div>
      <label>
        Selecione um produto:
        <select value={selectedProductId} onChange={handleProductSelection}>
          <option value="">Selecione um produto</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <form onSubmit={handleUpdateProduct}>
        {/* Campos do formulário */}
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
    </div>
  );
};

export default UpdateProductForm;
