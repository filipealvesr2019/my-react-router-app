import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sales.module.css";

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
        setCreditCard(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os pix:", error);
      });
  }, []);

  const renderFirstImage = (products) => {
    if (products.length > 0) {
      return (
        <img
          src={products[0].image}
          alt={`Produto ${products[0].productId}`}
          style={{ width: "5vw" }}
        />
      );
    } else {
      return null;
    }
  };


  
  const handleTrackingCode = (orderId) => {
    const trackingCode = prompt("Insira o código de rastreamento:");
  
    if (trackingCode) {
      axios
        .post(`http://localhost:3001/api/traking/code/${orderId}`, { trackingCode })
        .then((response) => {
          console.log(response.data.message);
          // Se necessário, atualize o estado ou forneça feedback visual ao usuário
        })
        .catch((error) => {
          console.error("Erro ao adicionar código de rastreamento:", error);
          // Se necessário, forneça feedback visual ao usuário sobre o erro
        });
    } else {
      // Se o usuário cancelar ou não fornecer um código de rastreamento
      console.log("Operação cancelada ou código de rastreamento vazio.");
    }
  };
  

  return (
    <div>
      <table
        style={{
          margin: "0 auto",
          width: "90vw",
          marginTop: "3rem",
        }}
      >
        <thead>
          <tr>
            <th className={styles.th}>Produtos</th>
            <th className={styles.th}>Cliente</th>
            <th className={styles.th}>pagamento</th>
            <th className={styles.th}>Quantidade</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {boletos.map((order, index) => (
            <tr key={order._id}>
              <td>
                <Link to={`/boleto/${order._id}`}>
                  {renderFirstImage(order.products)}
                </Link>
              </td>
              <td>
                <Link to={`/customers/data/${order.customer}`}>
                  <span className={styles.span}>{order.name}</span>
                </Link>
              </td>
              <td>{order.billingType}</td>

              <td>
                <div>
                  {" "}
                  <span style={{ marginLeft: "2rem" }}>
                    {order.totalQuantity}{" "}
                  </span>
                </div>
              </td>
              <td>
                {" "}
                <span style={{ marginLeft: "2rem" }}>R${order.value}</span>{" "}
              </td>
              <td>
              <button
            className={styles.button}
            onClick={() => handleTrackingCode(order._id)}
          >
            Adicionar código de rastreio
          </button>
              {console.log(order._id)}
              </td>
            </tr>
          ))}
          {pix.map((order, index) => (
            <tr key={order._id}>
              <td>
                <Link to={`/pix/${order._id}`}>
                  {renderFirstImage(order.products)}
                </Link>
              </td>
              <td>
                <Link to={`/customers/data/${order.customer}`}>
                  {order.name}
                </Link>
              </td>
              <td>{order.billingType}</td>

              <td>
                <span style={{ marginLeft: "2rem" }}>
                  {order.totalQuantity}
                </span>{" "}
              </td>

              <td>
                {" "}
                <span style={{ marginLeft: "2rem" }}>R${order.value}</span>{" "}
              </td>
              <td>
                {" "}
                <span style={{ marginLeft: "2rem" }}>
                  <button className={styles.button}>
                    adicioanar codigo de rastreio
                  </button>
                </span>{" "}
              </td>
            </tr>
          ))}
          {creditCard.map((order, index) => (
            <tr key={index}>
              <td>
                <Link to={`/creditCard/${order._id}`}>
                  {renderFirstImage(order.products)}
                </Link>
              </td>
              <td>
                <Link to={`/customers/data/${order.customer}`}>
                  {order.name}
                </Link>
              </td>
              <td>
                {order.billingType === "CREDIT_CARD" && "Cartão de Crédito"}
              </td>

              <td>
                {" "}
                <span style={{ marginLeft: "2rem" }}>
                  {order.totalQuantity}
                </span>
              </td>
              <td>
                {" "}
                <span style={{ marginLeft: "2rem" }}>R${order.value}</span>{" "}
              </td>
              <td>
                {" "}
                <span style={{ marginLeft: "2rem" }}>
                  <button className={styles.button}>
                    adicioanar codigo de rastreio
                  </button>
                </span>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
