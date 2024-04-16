import axios from "axios";
import { useEffect, useState } from "react";

const Sales = () => {
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/boletos`)
      .then((response) => {
        setBoletos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os boletos:", error);
      });

    axios
      .get(`http://localhost:3001/api/pix`)
      .then((response) => {
        setPix(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os pix:", error);
      });
    axios
      .get(`http://localhost:3001/api/creditCard`)
      .then((response) => {
        setPix(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os pix:", error);
      });
  }, []);

  return (
    <div>
      <table
        style={{
          margin: "0 auto",
          width: "90vw",
          marginTop: "3rem",
          borderRight: "1px solid #dddddd",
          borderLeft: "1px solid #dddddd",
        }}
      >
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Nome</th>
            <th>pagamento</th>
            <th>Tamanho</th>
            <th>Quantidade</th>
            <th>Total</th>

          </tr>
        </thead>
        <tbody>
          {boletos.map((order, index) => (
            <tr key={order._id}>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </div>
                ))}
              </td>
              <td>{/* Renderizar nome do boleto */}</td>
              <td>{order.billingType}</td>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>{product.size}</div>
                ))}
              </td>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>{product.quantity}</div>
                ))}
              </td>
              <td>R${order.value}</td>

            </tr>
          ))}
          {pix.map((order, index) => (
            <tr key={order._id}>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </div>
                ))}
              </td>
              <td>{/* Renderizar nome do pix */}</td>
              <td>{order.billingType}</td>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>{product.size}</div>
                ))}
              </td>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>{product.quantity}</div>
                ))}
              </td>
              <td>R${order.value}</td>

            </tr>
          ))}
           {creditCard.map((order, index) => (
            <tr key={order._id}>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </div>
                ))}
              </td>
              <td>{/* Renderizar nome do pix */}</td>
              <td>{order.billingType}</td>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>{product.size}</div>
                ))}
              </td>
              <td>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>{product.quantity}</div>
                ))}
              </td>
              <td>R${order.value}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
