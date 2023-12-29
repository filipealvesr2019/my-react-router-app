import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import ModelUpdate from "../../components/ModelUpdate";
import DeleteModal from "../../components/DeleteModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  const handleUpdateProduct = (productId) => {
    // Defina o produto selecionado com base no ID
    const productToUpdate = products.find((product) => product._id === productId);
    setSelectedProduct(productToUpdate);
    setIsUpdateModalOpen(true);
  };

  // Função para lidar com o fechamento do formulário de atualização
  const handleCloseForm = () => {
    setSelectedProduct(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <TextField id="outlined-search" label="Search field" type="search" />

      <div className={styles.Model}>
        <ModelProducts />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
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
                  <tr className={styles.td} key={product._id}>
                    <td className={styles.td}>{product.name}</td>
                    <td>
                      <div className={styles.spanContainer}>
                        <span
                          onClick={() => handleDeleteProduct(product._id)}
                          className={styles.span}
                        ></span>
                        <DeleteModal
                          onDelete={() => handleDeleteProduct(product._id)}
                        />
                        <button onClick={() => handleUpdateProduct(product._id)}>
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal for updating product */}
      {isUpdateModalOpen && (
        <ModelUpdate
          selectedProduct={selectedProduct}
          onCloseForm={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Products;
