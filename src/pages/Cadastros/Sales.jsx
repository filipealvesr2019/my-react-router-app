import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sales.module.css";
import BasicModal from "./BasicModal";

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
            <th className={styles.th}>Status</th>
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
                {" "}
                <p
                  className={`${styles.status} ${
                    styles[order.status.toLowerCase()]
                  }`}
                >
                  {" "}
                  {(() => {
                    switch (order.status) {
                      case "RECEIVED":
                        return "pago";
                      case "CONFIRMED":
                        return "Cobrança confirmada";
                      case "PENDING":
                        return "Pendente";
                      case "OVERDUE":
                        return "Cobrança vencida";
                      default:
                        return;
                    }
                  })()}
                </p>
              </td>
              <td>
                <Link to={`/customers/data/${order.customer}`}>
                  <span className={styles.span}>{order.name}</span>
                </Link>
              </td>
              <td>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  {order.billingType === "PIX" && (
                    <img
                      src="https://i.ibb.co/dfvK4s0/icons8-foto-48.png"
                      alt=""
                      style={{
                        maxWidth: "14vw",
                      }}
                    />
                  )}
                  {order.billingType === "BOLETO" && (
                    <img
                      src="https://i.ibb.co/LNrSsZt/icons8-boleto-bankario-48.png"
                      alt=""
                      style={{ maxWidth: "14vw" }}
                    />
                  )}

                  {order.billingType === "CREDIT_CARD" && (
                    <img
                      src="https://i.ibb.co/HtWhHR0/icons8-emoji-de-cart-o-de-cr-dito-48.png"
                      alt=""
                    />
                  )}
                  {order.billingType}
                </p>
              </td>

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
                <BasicModal orderId={order._id} tracking={order.trackingCode} />
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
                <p
                  className={`${styles.status} ${
                    styles[order.status.toLowerCase()]
                  }`}
                >
                  {(() => {
                    switch (order.status) {
                      case "RECEIVED":
                        return "pago";
                      case "CONFIRMED":
                        return "Cobrança confirmada";
                      case "PENDING":
                        return "Pendente";
                      case "OVERDUE":
                        return "Cobrança vencida";
                      default:
                        return;
                    }
                  })()}
                </p>
              </td>
              <td>
                <Link to={`/customers/data/${order.customer}`}>
                  {order.name}
                </Link>
              </td>
              <td>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  {order.billingType === "PIX" && (
                    <img
                      src="https://i.ibb.co/dfvK4s0/icons8-foto-48.png"
                      alt=""
                      style={{
                        maxWidth: "14vw",
                      }}
                    />
                  )}
                  {order.billingType === "BOLETO" && (
                    <img
                      src="https://i.ibb.co/LNrSsZt/icons8-boleto-bankario-48.png"
                      alt=""
                      style={{ maxWidth: "14vw" }}
                    />
                  )}

                  {order.billingType === "CREDIT_CARD" && (
                    <img
                      src="https://i.ibb.co/HtWhHR0/icons8-emoji-de-cart-o-de-cr-dito-48.png"
                      alt=""
                    />
                  )}
                  {order.billingType}
                </p>
              </td>

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
                  <BasicModal
                    orderId={order._id}
                    tracking={order.trackingCode}
                  />
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
                <p
                  className={`${styles.status} ${
                    styles[order.status.toLowerCase()]
                  }`}
                >
                  {(() => {
                    switch (order.status) {
                      case "RECEIVED":
                        return "pago";
                      case "CONFIRMED":
                        return "Cobrança confirmada";
                      case "PENDING":
                        return "Pendente";
                      case "OVERDUE":
                        return "Cobrança vencida";
                      default:
                        return;
                    }
                  })()}
                </p>
              </td>
              <td>
                <Link to={`/customers/data/${order.customer}`}>
                  {order.name}
                </Link>
              </td>
              <td>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  {order.billingType === "PIX" && (
                    <img
                      src="https://i.ibb.co/dfvK4s0/icons8-foto-48.png"
                      alt=""
                      style={{
                        maxWidth: "14vw",
                      }}
                    />
                  )}
                  {order.billingType === "BOLETO" && (
                    <img
                      src="https://i.ibb.co/LNrSsZt/icons8-boleto-bankario-48.png"
                      alt=""
                      style={{ maxWidth: "14vw" }}
                    />
                  )}

                  {order.billingType === "CREDIT_CARD" && (
                    <img
                      src="https://i.ibb.co/HtWhHR0/icons8-emoji-de-cart-o-de-cr-dito-48.png"
                      alt=""
                    />
                  )}
                  {order.billingType === "CREDIT_CARD" && "Cartão de Crédito"}
                </p>
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
                  <BasicModal
                    orderId={order._id}
                    tracking={order.trackingCode}
                  />
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
