import React, { useState } from 'react';
import axios from 'axios';
import "./AddVariationForm.css"
const AddVariationForm = ({ productId }) => {
  const [color, setColor] = useState('');
  const [urls, setUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(''); // Para controlar a entrada atual
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('');
  const [prices, setPrices] = useState([]); // Adicionei o estado para os preços
  const [price, setPrice] = useState('');
  const [quantities, setQuantities] = useState([]);
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [feedback, setFeedback] = useState([]);

  const handleAddVariation = async () => {
    try {
      const newVariation = {
        color,
        urls,
        sizes: sizes.map((size, index) => ({
          size,
          price: prices[index],
          quantityAvailable: quantities[index]
        }))
      };

      // Faz a requisição POST para adicionar a variação
      const response = await axios.post(`http://localhost:3001/api/product/${productId}/add-variation`, newVariation);
      
      // Verifica se a adição foi bem-sucedida
      if (response.data.success) {
        console.log("Variação adicionada com sucesso!");
        // Limpa os campos após adicionar uma variação, se necessário
        setColor('');
        setUrls([]);
        setCurrentUrl('');
        setSizes([]);
        setPrices([]); // Limpa também os preços
        setQuantities([]);
        setSize('');
        setPrice('');
        setQuantityAvailable('');
        setFeedback([]); // Limpa o feedback

      } else {
        console.error("Erro ao adicionar variação:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao adicionar variação:", error);
    }
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    setUrls([...urls, currentUrl]); // Adiciona a URL atual à lista de URLs
    setCurrentUrl(''); // Limpa a entrada atual
  };

  const handleAddSizePriceQuantity = () => {
    setSizes([...sizes, size]);
    setPrices([...prices, price]);
    setQuantities([...quantities, quantityAvailable]);
    setSize('');
    setPrice('');
    setQuantityAvailable('');
    setFeedback([...feedback, `Tamanho: ${size}, Preço: ${price}, Quantidade: ${quantityAvailable}`]); // Adiciona feedback

  };

  return (
    <div >

       <div>
       <h2 className='h2Container'>Adicionar Variação</h2>
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
        value={currentUrl}
        onChange={(e) => setCurrentUrl(e.target.value)}
      />
      <button className='AddUrlButton' onClick={handleAddUrl}>Adicionar URL</button>
      <ul>
        {urls.map((url, index) => (
         <>
         {url &&  <img src={url} alt=""  key={index} style={{width:"20vw"}}/>}
        
         <li key={index}>{url}</li>
         
         </>
        ))}
      </ul>
       </div>

      <div>
     
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
      <button  type="button"  className='variationSizePriceQuantityButton' onClick={handleAddSizePriceQuantity}>Adicionar Tamanho/Preço/Quantidade</button>
      {feedback.length > 0 && (
        <div>
          <h3>Adicionado recentemente:</h3>
          <ul>
            {feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      </div>

      <div className='AddVariationButton__Container'>

      <button className='AddVariationButton' onClick={handleAddVariation}>Adicionar Variação</button>
      </div>
    </div>
  );
};

export default AddVariationForm;