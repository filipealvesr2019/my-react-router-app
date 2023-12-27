import React from "react";
import styles from "./Products.module.css";
import EditIcon from "@mui/icons-material/Edit";
import ModelProducts from "../../components/ModelProducts"
const Products = () => {
  return (
    <div className={styles.container}>
        <div className={styles.Model}>
        <ModelProducts/>
        </div>
            
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
  <main>
    <h1 style={{fontSize:"1.5rem", color:"#2A337C"}}>Cadastro de produtos</h1>
    <div>
      <table style={{ margin: '0 auto', width:"50dvw" }}>
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tr">
            <td className="td">Nome dos produtos</td>
            <td>Editar Excluir</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</div>

    </div>
  );
};

export default Products;
