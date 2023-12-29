import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";
// ... (imports)

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
useEffect(() => {
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      setProducts(response.data.products);
      console.log("Products after fetching:", response.data.products);
    } catch (error) {
      console.error("Erro ao obter produtos", error);
      setError("Erro ao obter produtos. Por favor, tente novamente.");
    } finally {
      setLoading(false);
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



  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data.products);
        console.log("Products after fetching:", response.data.products);
      } catch (error) {
        console.log("Erro ao obter produtos", error);
      }
    };
  
    getProducts();
  }, []);
  const handleUpdateProductApi = async (updatedProduct) => {
    try {
      setLoading(true);
  
      if (!updatedProduct || !updatedProduct._id) {
        console.error('Dados inválidos para atualização do produto.');
        return;
      }
  
      // Restante do código...
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* ... (other components) */}

      <div className={styles.Model}>
        <ModelProducts />
      </div>

      {/* ... (other components) */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
        }}
      >
        <main>
        {error && <div style={{ color: 'red' }}>{error}</div>}

          <h1 style={{ fontSize: "1.5rem", color: "#2A337C" }}>
            Cadastro de produtos
          </h1>
          <div>
            <table style={{ margin: "0 auto", width: "50vw" }}>
              <thead>
                <tr>
                  <th>Produtos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
               
{filteredProducts.map((product) => (
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

      </div>
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
