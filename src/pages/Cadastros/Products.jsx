import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
const Products = () => {
  const { isAdmin, isManager } = useAuth();

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
      const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

      const token = Cookies.get('token'); // Obtenha o token do cookie
      console.log('Token:', token);

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
      const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

      const token = Cookies.get('token'); // Obtenha o token do cookie

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

      
      const token = Cookies.get('token'); // Obtenha o token do cookie
      const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie
      console.log('Token:', token);

      

      const response = await axios.put(
        `http://localhost:3001/api/update/product/${productId}`,
        {
          ...formData,
          newColorName: newColorName, // Adicione o novo nome da cor aos dados do formulário
        },   {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        }
      );







      if (response.data._id) {
        console.log("Produto atualizado com sucesso");
        const updatedProductsResponse = await axios.get(
          "http://localhost:3001/api/products",
          
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
        price: 0,
        quantity: 0,
        description: "",
        size: "",
        category: "",
        subcategory: "",
        variations: [
          {
            color: "",
            urls: [], // Make sure this is an array
          },
        ],
      });
      setNewColorName("");
    } catch (error) {
      console.error("Erro ao atualizar produto. Detalhes do erro:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  // Restante do código...
  const handleEditUrl = (productId, color, index, newUrl) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product._id === productId) {
          const updatedVariations = product.variations.map((variation) => {
            if (variation.color === color) {
              return {
                ...variation,
                urls: variation.urls.map((url, i) =>
                  i === index ? newUrl : url
                ),
              };
            }
            return variation;
          });

          return {
            ...product,
            variations: updatedVariations,
          };
        }
        return product;
      });

      return updatedProducts;
    });
  };

  const getImagesByColor = (product, color) => {
    const updatedProduct =
      products.find((p) => p._id === product._id) || product;

    return updatedProduct.variations
      .filter((variation) => variation.color === color)
      .map((variation) => (
        <div key={variation._id}>
          <p>Cor: {variation.color}</p>
          <ul>
            {variation.urls.map((url, index) => (
              <li key={index}>
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <label>
                  Editar URL:
                  <input
                    type="text"
                    value={url}
                    onChange={(e) =>
                      handleEditUrl(product._id, color, index, e.target.value)
                    }
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      ));
  };

  const handleAddNewColor = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/product/${productId}/add-color`,
        {
          color: newColorName,
        }
      );

      if (response.data.success) {
        console.log("Nova cor adicionada com sucesso");
      } else {
        console.error("Erro ao adicionar nova cor:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao adicionar nova cor:", error);
    }
  };

  // Função para excluir uma URL de uma cor específica de um produto
  const handleDeleteUrl = async (productId, color, urlId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/product/${productId}/color/${color}/url/${urlId}`
      );

      if (response.data.success) {
        console.log("URL excluída com sucesso");
        // Atualize o estado ou realize outras ações necessárias
      } else {
        console.error("Erro ao excluir URL:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao excluir URL:", error);
    }
  };

  const handleAddNewUrl = async (productId) => {
    try {
      // Resto do código...

      const response = await axios.post(
        `http://localhost:3001/api/product/${productId}/color/${selectedColor}/add-url`,
        { url: novaUrl }
      );

      console.log("Resposta do servidor:", response);

      // Resto do código...
    } catch (error) {
      console.error("Erro ao adicionar URL:", error);
    }
  };

  const handleDeleteColor = async (productId, colorName) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/product/${productId}/color/${colorName}`
      );

      console.log("Resposta do servidor:", response);

      // Atualize o estado ou qualquer outra lógica necessária após a exclusão da cor
    } catch (error) {
      console.error("Erro ao excluir cor:", error);
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
                {filteredProducts && filteredProducts.map((product) => (
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
