import React from "react";
import Products from "./pages/Cadastros/Products";

const ManagerPage = () => {
  return (
    <div>
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

      <div >
        <Products></Products>
      </div>
    </div>
  );
};

export default ManagerPage;
