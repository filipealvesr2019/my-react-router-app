import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import ModelUpdate from "../../components/ModelUpdate";
import DeleteModal from "../../components/DeleteModal";
const Products = () => {
  const [products, setProducts] = useState([]);

  // get products from api
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data.products);
        console.log("data", response.data.products);
      } catch (error) {
        console.log("Erro ao obter produtos", error);
      }
    };

    getProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/admin/product/${productId}`
      );

      if (response.data.success) {
        // Atualizar a lista de produtos após a exclusão bem-sucedida
        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(updatedProducts);
        console.log("Produto excluído com sucesso");
      } else {
        console.error(
          "Erro ao excluir produto. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao excluir produto. Detalhes do erro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.Model}>
        <ModelProducts />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <main>
          <h1 style={{ fontSize: "1.5rem", color: "#2A337C" }}>
            Cadastro de produtos
          </h1>
          <div>
            <table style={{ margin: "0 auto", width: "50dvw" }}>
              <thead>
                <tr>
                  <th>Produtos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="tr" key={product._id}>
                    <td className="td">{product.name}</td>
                    <td>
                      <span onClick={() => {}}>
                        <ModelUpdate />
                      </span>
                      <span
                        onClick={() => handleDeleteProduct(product._id)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      ></span>
                      <DeleteModal
                        onDelete={() => handleDeleteProduct(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
