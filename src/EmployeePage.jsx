import React, { useEffect, useState } from "react";

import styles from "./EmployeePage.module.css";
import Products from "./pages/Cadastros/Products";
ModelProducts
import axios from "axios";
import ModelProducts from "./components/ModelProducts";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";

const EmployeePage = () => {

  const [products, setProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [newColorName, setNewColorName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productId, setProductId] = useState(""); // Certifique-se de definir corretamente o valor inicial
  const [novaUrl, setNovaUrl] = useState("");

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
        color: "", // Assuming color is a string
        urls: [], // Make sure this is an array
      },
    ],
    // ... other necessary fields
    // ... outros campos necessários
  });

  useEffect(() => {
    getProducts();
  }, [currentPage, searchTerm]);

 
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/products?page=${currentPage}&keyword=${searchTerm}`
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Update the handleUpdateProduct function to close the modal after updating
  // Restante do código...

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
          position: "sticky",
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
                {filteredProducts.map((product) => (
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
                                  price: 0,
                                  quantity: 0,
                                  description: "",
                                  size: "",
                                  category: "",
                                  subcategory: "",
                                  variations: [
                                    {
                                      color: "", // Assuming color is a string
                                      urls: [], // Assuming urls is a string
                                    },
                                  ],
                                  // ... other necessary fields
                                  // ... outros campos necessários
                                });
                                setSelectedImageIndex(null);
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
                                  <label>
                                    Nome:
                                    <input
                                      type="text"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleFormChange}
                                    />
                                  </label>
                                  <label>
                                    Preço:
                                    <input
                                      type="number"
                                      name="price"
                                      value={formData.price}
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
                                    Tamanho:
                                    <input
                                      type="text"
                                      name="size"
                                      value={formData.size}
                                      onChange={handleFormChange}
                                    />
                                  </label>
                                  <label>
                                    Quantidade:
                                    <input
                                      type="number"
                                      name="quantity"
                                      value={formData.quantity}
                                      onChange={handleFormChange}
                                    />
                                  </label>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      marginTop: "-5rem",
                                    }}
                                  >
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

                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      left: "25%",
                                      top: "22%",
                                      position: "absolute",
                                    }}
                                  >
                                    {" "}
                                    <div style={{ display: "inline-block" }}>
                                      <label>
                                        Selecione a cor:
                                        <select
                                          value={selectedColor}
                                          onChange={(e) =>
                                            setSelectedColor(e.target.value)
                                          }
                                        >
                                          <option value="">
                                            Escolher a Cor
                                          </option>
                                          {Array.from(
                                            new Set(
                                              product.variations.map(
                                                (variation) => variation.color
                                              )
                                            )
                                          ).map((color) => (
                                            <option key={color} value={color}>
                                              {color}
                                            </option>
                                          ))}
                                        </select>
                                      </label>
                                      {/* Botão para excluir cor */}
                                      <button
                                        onClick={() =>
                                          handleDeleteColor(
                                            product._id,
                                            selectedColor
                                          )
                                        }
                                        style={{
                                          width: "8vw",
                                          height: "5vh",
                                          backgroundColor: "#14337c",
                                          color: "#fefefe",
                                          border: "medium",
                                          padding: ".5rem",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        Excluir Cor
                                      </button>
                                    </div>
                                    {product.variations
                                      .filter(
                                        (variation) =>
                                          variation.color === selectedColor
                                      )
                                      .map((variation) => (
                                        <div key={variation._id}>
                                          <p>Cor: {variation.color}</p>
                                          <ul
                                            style={{
                                              listStyle: "none",
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            {variation.urls.map(
                                              (url, index) => (
                                                <li
                                                  key={index}
                                                  style={{
                                                    display: "inline-block",
                                                  }}
                                                >
                                                  <img
                                                    src={url}
                                                    alt={`Thumbnail ${
                                                      index + 1
                                                    }`}
                                                    style={{
                                                      maxWidth: "100px",
                                                      maxHeight: "100px",
                                                    }}
                                                  />
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                    }}
                                                  >
                                                    <button
                                                      onClick={() =>
                                                        handleDeleteUrl(
                                                          product._id,
                                                          selectedColor,
                                                          index
                                                        )
                                                      }
                                                      style={{
                                                        width: "15vh",
                                                        backgroundColor:
                                                          "#14337c",
                                                        color: "#fefefe",
                                                        border: "medium",
                                                        padding: ".5rem",
                                                        borderRadius: "5px",
                                                      }}
                                                    >
                                                      Excluir URL
                                                    </button>


                                                    
                                                  </div>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      ))}
                                  </div>
                                  <div
                                    style={{
                                      position: "absolute",
                                      right: "25%",
                                      top: "35%",
                                    }}
                                  >
                                    <label>
                                      <input
                                        type="text"
                                        value={novaUrl}
                                        onChange={(e) =>
                                          setNovaUrl(e.target.value)
                                        }
                                        style={{ width: "12vw", height: "5vh" }}
                                        placeholder="Nova Url..."
                                      />
                                    </label>
                                    <button
                                      onClick={() =>
                                        handleAddNewUrl(product._id)
                                      }
                                      style={{
                                        backgroundColor: "#14337c",
                                        color: "#fefefe",
                                        border: "medium",
                                        padding: ".5rem",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      Adicionar Nova URL
                                    </button>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      left: "80%",
                                      top: "30%",
                                    }}
                                  >
                                    <label>
                                      Novo Nome da Cor:
                                      <input
                                        type="text"
                                        name="newColorName"
                                        value={newColorName}
                                        onChange={(e) =>
                                          setNewColorName(e.target.value)
                                        }
                                        style={{ width: "15vw", height: "5vh" }}
                                      />
                                    </label>
                                    <button
                                      style={{
                                        width: "11vw",
                                        height: "5vh",
                                        backgroundColor: "#14337c",
                                        color: "#fefefe",
                                        border: "medium",
                                        padding: ".5rem",
                                        borderRadius: "5px",
                                      }}
                                      onClick={() =>
                                        handleAddNewColor(product._id)
                                      }
                                    >
                                      Adicionar Nova Cor
                                    </button>
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
                            >
                              <img
                                src="https://i.ibb.co/5R1QnT7/edit-1.png"
                                alt=""
                              />
                              Editar
                            </button>

                            <div className={styles.deleteBtn}>
                                <>
                                  <span
                                 
                                    className={styles.span}
                                  ></span>
                               
                                </>
                           
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
    </>
  );
};

export default EmployeePage;
