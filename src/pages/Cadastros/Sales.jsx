import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Sales.module.css";
import BasicModal from "./BasicModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Sales = () => {
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [pixSearchTerm, setPixSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/boletos?page=${page}`)
      .then((response) => {
        setBoletos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os boletos:", error);
      });

    axios
      .get(`http://localhost:3001/api/pix?page=${page}&name=${pixSearchTerm}`)
      .then((response) => {
        setPix(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os pix:", error);
      });

    axios
      .get(`http://localhost:3001/api/creditCard?page=${page}`)
      .then((response) => {
        setCreditCard(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter os pix:", error);
      });
  }, [page]);

  const handleSearchChange = (event) => {
    setPixSearchTerm(event.target.value);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

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

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabStyle = {
    color: "#2196F3", // Cor de fundo das tabs ativas
    // Outros estilos conforme necessário
  };

  const handlePixSearch = () => {
    // Realiza a pesquisa com base no termo de pesquisa (pixSearchTerm)
    axios
      .get(`http://localhost:3001/api/pix?page=${page}&name=${pixSearchTerm}`)
      .then((response) => {
        // Atualiza o estado do componente com os resultados da pesquisa
        setPix(response.data);
        console.log("Resultados da pesquisa:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao realizar a pesquisa:", error);
      });
  };



  const handleBoletoSearch = () => {
    // Realiza a pesquisa com base no termo de pesquisa (pixSearchTerm)
    axios
      .get(`http://localhost:3001/api/boletos?page=${page}&name=${pixSearchTerm}`)
      .then((response) => {
        // Atualiza o estado do componente com os resultados da pesquisa
        setBoletos(response.data);
        console.log("Resultados da pesquisa:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao realizar a pesquisa:", error);
      });
  };
 

  

  const handleCreditCardSearch = () => {
    // Realiza a pesquisa com base no termo de pesquisa (pixSearchTerm)
    axios
      .get(`http://localhost:3001/api/creditCard?page=${page}&name=${pixSearchTerm}`)
      .then((response) => {
        // Atualiza o estado do componente com os resultados da pesquisa
        setCreditCard(response.data);
        console.log("Resultados da pesquisa:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao realizar a pesquisa:", error);
      });
  };
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      
      
      handlePixSearch(); // Chama a função de pesquisa quando a tecla "Enter" for pressionada
      handleBoletoSearch(); // Chama a função de pesquisa quando a tecla "Enter" for pressionada

      handleCreditCardSearch(); // Chama a função de pesquisa quando a tecla "Enter" for pressionada

    }
  };

  
  return (
    <div
      style={{
        position: "relative",
        display: "flex", // Centraliza horizontalmente
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        gap: "1rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50px",
          margin: "0 auto",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "1.2rem",
              fontWeight: "500",
              fontFamily: "poppins",
              margin: "0 auto",
              justifyContent: "center",
            }}
          >
            <span
              style={activeTab === 0 ? tabStyle : {}}
              onClick={() => handleTabClick(0)}
            >
              Pix
            </span>
            <span
              style={activeTab === 1 ? tabStyle : {}}
              onClick={() => handleTabClick(1)}
            >
              Boleto
            </span>
            <span
              style={activeTab === 2 ? tabStyle : {}}
              onClick={() => handleTabClick(2)}
            >
              Cartão de Crédito
            </span>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 0 && (
              <div>
                <input
                  type="text"
                  placeholder="Pesquisar por nome..."
                  value={pixSearchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown} // Chama a função handleKeyDown quando uma tecla é pressionada
                />
                <button onClick={handlePixSearch}>Pesquisar</button>

                <table
                  style={{
                    position: "relative",
                    width: "90vw",
                    marginTop: "3rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th className={styles.th}>Produtos</th>
                      <th className={styles.th}>Status</th>
                      <th className={styles.th}>Cliente</th>
                      <th className={styles.th}>Pagamento</th>
                      <th className={styles.th}>Parcelas</th>
                      <th className={styles.th}>Quantidade</th>
                      <th className={styles.th}>Total</th>
                      <th className={styles.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
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
                          <Link
                            to={`/customers/data/${order.customer}`}
                            className={styles.link}
                          >
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
                        <td>0</td>
                        <td>
                          <span style={{ marginLeft: "2rem" }}>
                            {order.totalQuantity}
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span style={{ marginLeft: "2rem" }}>
                            R${order.value}
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>
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
                <Pagination
                  count={10} // Número total de páginas
                  page={page} // Página atual
                  onChange={handleChange} // Função para manipular a mudança de página
                  color="primary"
                  style={{ marginTop: "2rem", marginBottom: " 2rem" }}
                />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                  <input
                  type="text"
                  placeholder="Pesquisar por nome..."
                  value={pixSearchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown} // Chama a função handleKeyDown quando uma tecla é pressionada
                />
                <button onClick={handleBoletoSearch}>Pesquisar</button>

                <table
                  style={{
                    position: "relative",
                    width: "90vw",
                    marginTop: "10rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th className={styles.th}>Produtos</th>
                      <th className={styles.th}>Status</th>
                      <th className={styles.th}>Cliente</th>
                      <th className={styles.th}>Pagamento</th>
                      <th className={styles.th}>Parcelas</th>
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
                          <Link
                            to={`/customers/data/${order.customer}`}
                            className={styles.link}
                          >
                            <span className={styles.span}>{order.name}</span>
                            {console.log("Customer ID:", order.customer)}
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
                        <td>0</td>
                        <td>
                          <span style={{ marginLeft: "2rem" }}>
                            {order.totalQuantity}
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span style={{ marginLeft: "2rem" }}>
                            R${order.value}
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>
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
                <Pagination
                  count={10} // Número total de páginas
                  page={page} // Página atual
                  onChange={handleChange} // Função para manipular a mudança de página
                  color="primary"
                  style={{ marginTop: "2rem", marginBottom: " 2rem" }}
                />
              </div>
            )}
            {activeTab === 2 && (
              <div>
                  <input
                  type="text"
                  placeholder="Pesquisar por nome..."
                  value={pixSearchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown} // Chama a função handleKeyDown quando uma tecla é pressionada
                />
                <button onClick={handleCreditCardSearch}>Pesquisar</button>

                <table
                  style={{
                    position: "relative",
                    width: "90vw",
                    marginTop: "3rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th className={styles.th}>Produtos</th>
                      <th className={styles.th}>Status</th>
                      <th className={styles.th}>Cliente</th>
                      <th className={styles.th}>Pagamento</th>
                      <th className={styles.th}>Parcelas</th>
                      <th className={styles.th}>Quantidade</th>
                      <th className={styles.th}>Total</th>
                      <th className={styles.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
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
                          <Link
                            to={`/customers/data/${order.customer}`}
                            className={styles.link}
                          >
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
                            {order.billingType === "CREDIT_CARD" &&
                              "Cartão de Crédito"}
                          </p>
                        </td>
                        <td>{order.installmentNumber}</td>
                        <td>
                          {" "}
                          <span style={{ marginLeft: "2rem" }}>
                            {order.totalQuantity}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span style={{ marginLeft: "2rem" }}>
                            R${order.value}
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>
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
                <Pagination
                  count={10} // Número total de páginas
                  page={page} // Página atual
                  onChange={handleChange} // Função para manipular a mudança de página
                  color="primary"
                  style={{ marginTop: "2rem", marginBottom: " 2rem" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
