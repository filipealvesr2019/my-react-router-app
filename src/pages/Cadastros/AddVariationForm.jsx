import React, { useState } from 'react';
import axios from 'axios';

const AddVariationForm = ({ productId }) => {
  const [color, setColor] = useState('');
  const [urls, setUrls] = useState([]);
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');

  const handleAddVariation = async () => {
    try {
      const newVariation = {
        color,
        urls,
        sizes: [{ size, price, quantityAvailable }]
      };

      // Faz a requisição POST para adicionar a variação
      const response = await axios.post(`http://localhost:3001/api/product/${productId}/add-variation`, newVariation);
      
      // Verifica se a adição foi bem-sucedida
      if (response.data.success) {
        console.log("Variação adicionada com sucesso!");
        // Limpa os campos após adicionar uma variação, se necessário
        setColor('');
        setUrls([]);
        setSize('');
        setPrice('');
        setQuantityAvailable('');
      } else {
        console.error("Erro ao adicionar variação:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao adicionar variação:", error);
    }
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    const newUrl = e.target.value;
    setUrls([...urls, newUrl]);
  };

  return (
    <div>
      <h2>Adicionar Variação</h2>
      <label htmlFor="color">Cor:</label>
      <input
        type="text"
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <label htmlFor="url">URLs:</label>
      <input
        type="text"
        id="url"
        value={urls}
        onChange={handleAddUrl}
      />
      <label htmlFor="size">Tamanho:</label>
      <input
        type="text"
        id="size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <label htmlFor="price">Preço:</label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="quantityAvailable">Quantidade Disponível:</label>
      <input
        type="text"
        id="quantityAvailable"
        value={quantityAvailable}
        onChange={(e) => setQuantityAvailable(e.target.value)}
      />
      <button onClick={handleAddVariation}>Adicionar Variação</button>
    </div>
  );
};

export default AddVariationForm;
