import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
const Products = () => {
  const { isAdmin, isManager } = useAuth();
  const [inStock, setInStock] = useState(false); // Inicializado como "sim", mas pode ser "não" dependendo da sua necessidade

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [newColorName, setNewColorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    size: "",
    category: "",
    subcategory: "",
    variations: [
      {
        color: "",
        urls: [],
        size: "",
        price: 0,
        QuantityPerUnit: 0,
      },
    ],
  });

  const { authToken } = useAuth();

  useEffect(() => {
    getProducts();
  }, [currentPage, searchTerm, authToken]);

  const handleDeleteProduct = async (productId) => {
    try {
      if (!isAdmin && !isManager) {
        toast.error("Você não tem permissão para excluir produtos.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        return;
      }
      const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie

      const token = Cookies.get("token"); // Obtenha o token do cookie
      console.log("Token:", token);

      const response = await axios.delete(
        `http://localhost:3001/api/admin/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        }
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

  const getProducts = async () => {
    try {
      const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie

      const token = Cookies.get("token"); // Obtenha o token do cookie

      const response = await axios.get(
        `http://localhost:3001/api/products?page=${currentPage}&keyword=${searchTerm}`,
        {
          headers: {
            Credentials: credentials,

            Authorization: `Bearer ${token}`,
          },
        }
      );

      const totalProducts = response.data.totalPages * itemsPerPage;
      setTotalPages(response.data.totalPages);

      setProducts(response.data.products);

      if (totalProducts < currentPage * itemsPerPage) {
        // If the current page has no items, go back one page
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      }
    } catch (error) {
      console.error("Erro ao obter produtos", error);
      setError("Erro ao obter produtos. Por favor, tente novamente.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    // Se o campo que está sendo alterado não estiver aninhado dentro de um array, atualize diretamente
    if (!name.includes(".")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      return;
    }

    // Se o campo que está sendo alterado estiver aninhado dentro de um array, atualize corretamente
    const [variationIndex, fieldName] = name.split(".");
    const updatedVariations = [...formData.variations];
    updatedVariations[variationIndex] = {
      ...updatedVariations[variationIndex],
      [fieldName]: value,
    };

    setFormData((prevData) => ({
      ...prevData,
      variations: updatedVariations,
    }));
  };
  const handleVariationChange = (field, value) => {
    // Clone o estado atual de formData
    const updatedFormData = { ...formData };

    // Atualize o campo específico da variação com o novo valor
    updatedFormData.variations[0][field] = value;

    // Defina o novo estado de formData
    setFormData(updatedFormData);
  };

  // Update the handleUpdateProduct function to close the modal after updating
  // Restante do código...

  // Update the handleUpdateProduct function to close the modal after updating
  const handleUpdateProduct = async (productId) => {
    try {
      if (!isAdmin && !isManager) {
        toast.error("Você não tem permissão para editar produtos.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        return;
      }

      const token = Cookies.get("token"); // Obtenha o token do cookie
      const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
      console.log("Token:", token);

      const response = await axios.put(
        `http://localhost:3001/api/update/product/${productId}`,
        {
          ...formData,
          newColorName: newColorName, // Adicione o novo nome da cor aos dados do formulário
          inStock: inStock, // Atualize o campo inStock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        }
      );

      if (response.data._id) {
        console.log("Produto atualizado com sucesso");
        const updatedProductsResponse = await axios.get(
          "http://localhost:3001/api/products"
        );
        const updatedProducts = updatedProductsResponse.data.products;
        setProducts(updatedProducts);
        console.log("Estado do produto atualizado:", updatedProducts);
      } else {
        console.error(
          "Erro ao atualizar produto. Mensagem do servidor:",
          response.data.error || "Mensagem de erro não disponível"
        );
      }

      setIsModalOpen(false);
      setFormData({
        _id: null,
        name: "",

        description: "",

        category: "",
        subcategory: "",
        variations: [
          {
            color: "",
            urls: [], // Make sure this is an array
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao atualizar produto. Detalhes do erro:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar por produto..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            margin: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "50dvw",
          }}
        />
      </div>

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

          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <main className="main">
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className={styles.h1Container}>
            <h1 style={{ fontSize: "1.5rem", color: "#2A337C" }}>
              Cadastro de produtos
            </h1>
          </div>

          <div>
            <table className={styles.tableContainer}>
              <thead>
                <tr>
                  <th>Produtos</th>
                  <th style={{ width: "25vw" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts &&
                  filteredProducts.map((product) => (
                    <tr className={styles.td} key={product._id}>
                      <td className={styles.td}>{product.name}</td>
                      <td>
                        <div className={styles.spanContainer}>
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
                                    _id: null,
                                    name: "",

                                    description: "",

                                    category: "",
                                    subcategory: "",
                                    variations: [
                                      {
                                        color: "", // Assuming color is a string
                                        urls: [], // Assuming urls is a string
                                        price: 0,
                                        size: "",
                                        QuantityPerUnit: 0,
                                      },
                                    ],
                                    // ... other necessary fields
                                    // ... outros campos necessários
                                  });
                                }}
                              >
                                <div className={styles.modalOverlay}>
                                  <div className={styles.modalContent}>
                                    <button
                                      className={styles.closeButton}
                                      onClick={() => setIsModalOpen(false)}
                                    >
                                      <CloseIcon />
                                    </button>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <label>
                                        Nome:
                                        <input
                                          type="text"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleFormChange}
                                        />
                                      </label>

                                      <label className={styles.label}>
                                        Descrição:
                                        <input
                                          type="text"
                                          name="description"
                                          value={formData.description}
                                          onChange={handleFormChange}
                                          className={styles.description}
                                        />
                                      </label>

                                      <label>
                                        Categoria:
                                        <input
                                          type="text"
                                          name="category"
                                          value={formData.category}
                                          onChange={handleFormChange}
                                        />
                                      </label>
                                      <label>
                                        Subcategoria:
                                        <input
                                          type="text"
                                          name="subcategory"
                                          value={formData.subcategory}
                                          onChange={handleFormChange}
                                        />
                                      </label>
                                    </div>

                                    <div>
                                      <label>
                                        Cor:
                                        <input
                                          type="text"
                                          name="color"
                                          value={formData.variations[0].color}
                                          onChange={(e) =>
                                            handleVariationChange(
                                              "color",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </label>

                                      <label>
                                        URLs:
                                        <input
                                          type="text"
                                          name="urls"
                                          value={formData.variations[0].urls.join(
                                            ","
                                          )} // Assumindo que as URLs são armazenadas como uma string separada por vírgulas
                                          onChange={(e) =>
                                            handleVariationChange(
                                              "urls",
                                              e.target.value.split(",")
                                            )
                                          }
                                        />
                                      </label>

                                      <label>
                                        Tamanho:
                                        <input
                                          type="text"
                                          name="size"
                                          value={formData.variations[0].size}
                                          onChange={(e) =>
                                            handleVariationChange(
                                              "size",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </label>

                                      <label>
                                        Preço:
                                        <input
                                          type="number"
                                          name="price"
                                          value={formData.variations[0].price}
                                          onChange={(e) =>
                                            handleVariationChange(
                                              "price",
                                              parseFloat(e.target.value)
                                            )
                                          }
                                        />
                                      </label>

                                      <label>
                                        Quantidade por unidade:
                                        <input
                                          type="number"
                                          name="QuantityPerUnit"
                                          value={
                                            formData.variations[0]
                                              .QuantityPerUnit
                                          }
                                          onChange={(e) =>
                                            handleVariationChange(
                                              "QuantityPerUnit",
                                              parseInt(e.target.value)
                                            )
                                          }
                                        />
                                      </label>

                                      <label htmlFor="">
                                        Produto em Estoque
                                      </label>
                                      <select
                                        value={inStock ? "true" : "false"}
                                        onChange={(e) =>
                                          setInStock(e.target.value === "true")
                                        }
                                      >
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                      </select>
                                    </div>

                                    <br></br>
                                    <button
                                      type="submit"
                                      className={styles.button}
                                    >
                                      Atualisar Produto
                                    </button>
                                  </div>
                                </div>
                              </form>
                            )}

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                              }}
                            >
                              <button
                                className={styles.buttonUpdate}
                                onClick={() => setFormData(product)}
                              >
                                <img
                                  src="https://i.ibb.co/5R1QnT7/edit-1.png"
                                  alt=""
                                />
                                Editar
                              </button>

                              <div className={styles.deleteBtn}>
                                {!isModalOpen && !formData._id && (
                                  <>
                                    <span
                                      onClick={() =>
                                        handleDeleteProduct(product._id)
                                      }
                                      className={styles.span}
                                    ></span>
                                    <DeleteModal
                                      onDelete={() =>
                                        handleDeleteProduct(product._id)
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {!isModalOpen && !formData._id && (
                <Pagination
                  count={isNaN(totalPages) ? 1 : totalPages}
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                  style={{
                    marginBottom: "1rem",
                    position: "sticky",
                    bottom: "0",
                    zIndex: "1",
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
