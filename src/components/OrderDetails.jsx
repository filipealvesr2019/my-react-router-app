import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [boleto, setBoleto] = useState(null);
  const [pix, setPix] = useState(null);
  const [creditCard, setCreditCard] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // Requisição para detalhes do boleto
    axios
      .get(`http://localhost:3001/api/orders/${id}`)
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
    
      {boleto && (
        <div>
          <h2 style={{ marginLeft: "4rem" }}>Detalhes do Pedido</h2>

          <table
            style={{
              margin: "0 auto",
              width: "90dvw",
              marginTop: "3rem",
              borderCollapse: "collapse",
              border: "1px solid #dddddd",
              marginBottom: "3rem",
            }}
          >
            <thead>
              <tr style={{ padding: "1rem" }}>
                <th style={{ padding: ".8rem", width: "15vw" }}>produtos</th>
                <th style={{ width: "40vw" }}>Nome</th>
                <th style={{ width: "40vw" }}>Tamanho</th>
                <th style={{ whiteSpace: "nowrap" }}>pagamento</th>
                <th style={{ width: "15vw" }}>Unidade</th>
              </tr>
            </thead>
            <tbody>
              {boleto.products.map((order, prodIndex) => (
                <tr key={prodIndex}>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    <img
                      src={order.image}
                      alt={`Produto ${order.productId}`}
                      style={{ width: "10vw" }}
                    />
                    <span>{order.name}</span>
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.name}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.size}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {boleto.billingType === "CREDIT_CARD" && "Cartão de Crédito"}
              
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 style={{ marginLeft: "4rem" }}>frete do pedido</h1>

          <table
            style={{
              margin: "0 auto",
              width: "90dvw",
              marginTop: "3rem",
              borderCollapse: "collapse",
              border: "1px solid #dddddd",
              marginBottom: "3rem",
            }}
          >
            <thead>
              <tr style={{ padding: "1rem" }}>
              <th style={{ width: "15vw" }}>logo</th>
                <th style={{ padding: ".8rem", width: "15vw" }}>
                  transportadora
                </th>

           
                <th style={{ width: "40vw" }}>Preço do frete</th>
                <th>codigo de ratreio</th>
              </tr>
            </thead>
            <tbody>
              {boleto.shippingFeeData && (
                <tr>
                  <img
                    src={boleto.shippingFeeData.logo}
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                      width: "20vw",
                    }}
                  ></img>

                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {boleto.shippingFeeData.transportadora}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    R${boleto.shippingFeeData.shippingFeePrice}
                  </td>
                  <td>{boleto.trackingCode}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {pix && (
        <div>
          <h2 style={{ marginLeft: "4rem" }}>Detalhes do Pedido</h2>

          <table
            style={{
              margin: "0 auto",
              width: "90dvw",
              marginTop: "3rem",
              borderCollapse: "collapse",
              border: "1px solid #dddddd",
              marginBottom: "3rem",
            }}
          >
            <thead>
              <tr style={{ padding: "1rem" }}>
                <th style={{ padding: ".8rem", width: "15vw" }}>produtos</th>
                <th style={{ width: "40vw" }}>Tamanho</th>
                <th style={{ whiteSpace: "nowrap" }}>pagamento</th>
                <th style={{ width: "15vw" }}>Unidade</th>
              </tr>
            </thead>
            <tbody>
              {pix.products.map((order, prodIndex) => (
                <tr key={prodIndex}>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    <img
                      src={order.image}
                      alt={`Produto ${order.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.size}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {pix.billingType === "CREDIT_CARD" && "Cartão de Crédito"}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 style={{ marginLeft: "4rem" }}>frete do pedido</h1>

          <table
            style={{
              margin: "0 auto",
              width: "90dvw",
              marginTop: "3rem",
              borderCollapse: "collapse",
              border: "1px solid #dddddd",
              marginBottom: "3rem",
            }}
          >
            <thead>
              <tr style={{ padding: "1rem" }}>
              <th style={{ width: "15vw" }}>logo</th>
                <th style={{ padding: ".8rem", width: "15vw" }}>
                  transportadora
                </th>

     
                <th style={{ width: "40vw" }}>Preço do frete</th>
                <th>codigo de ratreio</th>

              </tr>
            </thead>
            <tbody>
              {pix.shippingFeeData && (
                <tr>
                  <img
                    src={pix.shippingFeeData.logo}
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                      width: "20vw",
                    }}
                  ></img>

                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {pix.shippingFeeData.transportadora}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                     R${pix.shippingFeeData.shippingFeePrice}
                  </td>
                  <td>{pix.trackingCode}</td>

                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {creditCard &&  <div>
          <h2 style={{ marginLeft: "4rem" }}>Detalhes do Pedido</h2>

          <table
            style={{
              margin: "0 auto",
              width: "90dvw",
              marginTop: "3rem",
              borderCollapse: "collapse",
              border: "1px solid #dddddd",
              marginBottom: "3rem",
            }}
          >
            <thead>
              <tr style={{ padding: "1rem" }}>
                <th style={{ padding: ".8rem", width: "15vw" }}>produtos</th>
                <th style={{ width: "40vw" }}>Tamanho</th>
                <th style={{ whiteSpace: "nowrap" }}>pagamento</th>
                <th style={{ width: "15vw" }}>Unidade</th>
              </tr>
            </thead>
            <tbody>
              {creditCard.products.map((order, prodIndex) => (
                <tr key={prodIndex}>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    <img
                      src={order.image}
                      alt={`Produto ${order.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.size}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {creditCard.billingType === "CREDIT_CARD" && "Cartão de Crédito"}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {order.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 style={{ marginLeft: "4rem" }}>frete do pedido</h1>

          <table
            style={{
              margin: "0 auto",
              width: "90dvw",
              marginTop: "3rem",
              borderCollapse: "collapse",
              border: "1px solid #dddddd",
              marginBottom: "3rem",
            }}
          >
            <thead>
              <tr style={{ padding: "1rem" }}>
              <th style={{ width: "15vw" }}>logo</th>
                <th style={{ padding: ".8rem", width: "15vw" }}>
                  transportadora
                </th>

            
                <th style={{ width: "40vw" }}>Preço do frete</th>
                <th>codigo de ratreio</th>

              </tr>
            </thead>
            <tbody>
              {creditCard.shippingFeeData && (
                <tr>
                  <img
                    src={creditCard.shippingFeeData.logo}
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                      width: "20vw",
                    }}
                  ></img>

                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                    {creditCard.shippingFeeData.transportadora}
                  </td>
                  <td
                    style={{
                      borderLeft: "1px solid #dddddd",
                      borderBottom: "1px solid #dddddd",
                      padding: "1rem",
                    }}
                  >
                     R${creditCard.shippingFeeData.shippingFeePrice}
                  </td>
                  <td>{creditCard.trackingCode}
</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>}
    </div>
  );
};

export default OrderDetails;
