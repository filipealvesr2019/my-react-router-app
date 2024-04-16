import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const [boleto, setBoleto] = useState(null);
  const [pix, setPix] = useState(null);
  const [creditCard, setCreditCard] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    // Requisição para detalhes do boleto
    axios
      .get(`http://localhost:3001/api/boleto/${id}`)
      .then((response) => {
        setBoleto(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os detalhes do boleto:", error);
      });

    // Requisição para detalhes do pix
    axios
      .get(`http://localhost:3001/api/pix/${id}`)
      .then((response) => {
        setPix(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os detalhes do pix:", error);
      });
        // Requisição para detalhes do pix
    axios
    .get(`http://localhost:3001/api/creditCard/${id}`)
    .then((response) => {
      setCreditCard(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Erro ao obter os detalhes do pix:", error);
    });
  }, [id]);

  return (
    <div>
      <h2>Detalhes do Pedido</h2>
      {boleto && <p>ID do Pedido do boleto: {boleto._id}</p>}
      {pix && <p>ID do Pedido do pix: {pix._id}</p>}
      {creditCard && <p>ID do Pedido do cartao de credito: {creditCard._id}</p>}

      {/* Adicione outros detalhes do pedido conforme necessário */}
    </div>
  );
};

export default OrderDetails;
