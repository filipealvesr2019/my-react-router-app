import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductStock = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Função para obter a lista de produtos da sua API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Substitua '/api/products' pela sua rota real
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = async (productId) => {
    try {
      // Aqui você pode fazer uma chamada à sua API para obter as entradas e saídas do produto
      //http://localhost:3001/api/products/65b6605352208fb9da56fb75/stock-history
      
      const response = await axios.get(`http://localhost:3001/api/products/${productId}/stock-history`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Erro ao buscar histórico de estoque do produto:', error);
    }
  };

  return (
    <div>
      <h2>ProductStock</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} onClick={() => handleProductClick(product._id)}>
            {product.name}
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div>
          <h3>Histórico de Estoque para {selectedProduct.name}</h3>
          {/* Renderize as entradas e saídas de estoque aqui */}
          {/* Exemplo: */}
          <ul>
            {selectedProduct.stockHistory.map((historyItem) => (
              <li key={historyItem._id}>
                {`Data: ${historyItem.date}, Tipo: ${historyItem.type}, Quantidade: ${historyItem.quantity}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductStock;
