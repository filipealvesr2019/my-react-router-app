import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
        color: "", // Assuming color is a string
        urls: [], // Make sure this is an array
      },
    ],
    // ... other necessary fields
    // ... outros campos necessários
  });

  useEffect(() => {
    getProducts();
  }, [currentPage]);

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

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/products?page=${currentPage}&keyword=${searchTerm}`
      );

      console.log("API Response:", response.data);

      const totalProducts = response.data.productsCount;
      const validItemsPerPage =
        Number.isFinite(itemsPerPage) && itemsPerPage > 0;

      if (Number.isFinite(totalProducts) && validItemsPerPage) {
        setTotalPages(Math.ceil(totalProducts / itemsPerPage));
      } else {
        console.error("TotalProducts or ItemsPerPage is not a valid number");
      }

      setProducts(response.data.products);
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
      const response = await axios.put(
        `http://localhost:3001/api/update/product/${productId}`,
        formData
      );

      console.log("Resposta do servidor:", response);

      if (response.data._id) {
        console.log("Produto atualizado com sucesso");
        const updatedProductsResponse = await axios.get(
          "http://localhost:3001/api/products"
        );
        const updatedProducts = updatedProductsResponse.data.products;
        console.log("Updated Products:", updatedProducts); // Log the received data
        setProducts(updatedProducts);
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
    } catch (error) {
      console.error("Erro ao atualizar produto. Detalhes do erro:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }

    console.log("Finalizando handleUpdateProduct...");
  };

  // Restante do código...

  console.log("Total Pages:", totalPages);
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
  const customStyle = {
    fontSize: "1.5rem",
    color: "#2A337C",
    marginLeft: "min(1.8rem, 3rem)",
  };
  
  const responsiveStyle = {
    // Adicione estilos específicos para larguras de tela menores
    "@media (max-width: 600px)": {
      fontSize: "1rem",
      marginLeft: "1rem", // Ajuste para larguras de tela menores
    },
  };
  
  // Combine os estilos usando spread operator
  const combinedStyle = { ...customStyle, ...responsiveStyle };
  return (
    <div className={styles.container}>
      <div style={{
         display: "flex",
         alignItems: "center",
         justifyContent: "center"
      }}>
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
          position: "relative",
        }}
      >
        <main style={{ position: "sticky" }}>
          {error && <div style={{ color: "red" }}>{error}</div>}
           <div className={styles.h1Container}>
           <h1
            style={{ fontSize: "1.5rem", color: "#2A337C"}}
          >
            Cadastro de produtos
          </h1>
           </div>
           
         
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
                                setSelectedColorPickerIndex(null);
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

                                  <div>
                                    <label>
                                      Selecione a cor:
                                      <select
                                        value={selectedColor}
                                        onChange={(e) =>
                                          setSelectedColor(e.target.value)
                                        }
                                      >
                                        <option value="">Escolher a Cor</option>
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

                                    {selectedColor && (
                                      <div>
                                        {getImagesByColor(
                                          product,
                                          selectedColor
                                        )}
                                      </div>
                                    )}
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
                        </div>

                        <div className={styles.deleteBtn}>
                          {!isModalOpen && !formData._id && (
                            <>
                              <span
                                onClick={() => handleDeleteProduct(product._id)}
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
