import React, { useEffect, useState } from "react";

import styles from "./EmployeePage.module.css";
import Products from "./pages/Cadastros/Products";

const EmployeePage = () => {



  return (
    <>
    <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          height: "12vh",
          backgroundColor: "#2196F3",
        }}
      >
        <h1
          style={{ fontSize: "1.3rem", color: "white", marginLeft: "1.5rem" }}
        >
          Painel Administrativo
        </h1>
      </div>

      <Products/>
    <div className={styles.container}>
     
    </div>
    </>
  );
};

export default EmployeePage;
