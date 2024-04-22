import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./CustomerDetails.module.css"
import Cookies from "js-cookie";

const CustomerDetails = () => {
  const [custumer, setCustumer] = useState(null);

  const { customer } = useParams();
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

  const token = Cookies.get('token'); // Obtenha o token do cookie
  useEffect(() => {
    // Request for customer details
    axios
      .get(`http://localhost:3001/api/customers/data/${customer}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: credentials,
        },
      })
      .then((response) => {
        setCustumer(response.data.customers);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, [customer]);

  return (
    <div> 

      {custumer && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5rem",
   

          }}
        >
                  <h1>Dados do cliente</h1>
          <label htmlFor=""> Name: </label>
          <input type="text" placeholder={custumer.name}  className={styles.input}/>
          <label htmlFor="" >CPF/CNPJ:</label>
          <input type="text" placeholder={custumer.cpfCnpj} className={styles.input}/>
          <label htmlFor="">Telefone:</label>
          <input type="text" placeholder={custumer.mobilePhone} className={styles.input}/>
          <label htmlFor=""> email: </label>
          <input type="text" placeholder={custumer.email} className={styles.input}/>
          <label htmlFor="">CEP:</label>
          <input type="text" placeholder={custumer.postalCode} className={styles.input}/>
          <label htmlFor="">endereço:</label>
          <input type="text" placeholder={custumer.address} className={styles.input}/>
          <label htmlFor=""> Numero da casa: </label>
          <input type="text" placeholder={custumer.addressNumber} className={styles.input}/>
          <label htmlFor="">complemento:</label>
          <input type="text" placeholder={custumer.complement} className={styles.input}/>
          <label htmlFor="">bairro:</label>
          <input type="text" placeholder={custumer.province} className={styles.input}/>
          <label htmlFor="">cidade:</label>
          <input type="text" placeholder={custumer.city} className={styles.input} />
          <label htmlFor="">estado:</label>
          <input type="text" placeholder={custumer.state} className={styles.input} style={{marginBottom:"5rem"}}/>
          
          
  
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
