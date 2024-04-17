import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            <th>Produtos</th>
            <th>Nome</th>
            <th>pagamento</th>
            <th>Quantidade</th>
            <th>Total</th>
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
                  {order.name}
                </Link>
              </td>
              <td>
  {order.billingType }
</td>

          
              <td>
              
                  <div >{order.totalQuantity}</div>
         
              </td>
              <td>R${order.value}</td>
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
              <td>
  {order.billingType}
</td>


              <td>{order.totalQuantity}</td>

              <td>R${order.value}</td>
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

              <td>{order.totalQuantity}</td>
              <td>R${order.value}</td>

         

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
