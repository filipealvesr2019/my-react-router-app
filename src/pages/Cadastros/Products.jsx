import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    // Add other fields as needed
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        // setLoading(false); // Assuming you have a loading state that you want to set to false
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Update the handleUpdateProduct function to close the modal after updating
  const handleUpdateProduct = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/products/${productId}`,
        formData
      );

      if (response.data.success) {
        console.log("Product updated successfully");
        const updatedProducts = await axios.get(
          "http://localhost:3001/api/products"
        );
        setProducts(updatedProducts.data.products);
      } else {
        console.error(
          "Error updating product. Server message:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error updating product. Error details:", error);
    } finally {
      setIsModalOpen(false);
    }
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
          {error && <div style={{ color: "red" }}>{error}</div>}

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
                      <div className={styles.deleteBtn}>
  {!isModalOpen && !formData._id && (
    <>
      <span
        onClick={() => handleDeleteProduct(product._id)}
        className={styles.span}
      ></span>
      <DeleteModal
        onDelete={() => handleDeleteProduct(product._id)}
      />
    </>
  )}
</div>

                        <button onClick={() => setFormData(product)}>
                          Update
                        </button>
                        <div
                          className={`${styles.container} ${styles.modalContainer}`}
                        >
                          {formData._id === product._id && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateProduct(product._id);
                                // Clear the form after submission
                                setFormData({
                                  name: "",
                                  price: 0,
                                  // Add other fields as needed
                                });
                              }}
                            >
                              <div className={styles.modalOverlay}>
                                <div className={styles.modalContent}>
                                  <label>
                                    Name:
                                    <input
                                      type="text"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleFormChange}
                                    />
                                  </label>
                                  <br />
                                  <label>
                                    Price:
                                    <input
                                      type="number"
                                      name="price"
                                      value={formData.price}
                                      onChange={handleFormChange}
                                    />
                                  </label>
                                  <br />
                                  {/* Add other form fields as needed */}
                                  <button type="submit">Update Product</button>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
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
