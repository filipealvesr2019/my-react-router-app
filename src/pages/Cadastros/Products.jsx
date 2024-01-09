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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [originalColor, setOriginalColor] = useState("");
  const [newColor, setNewColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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
 

  const handleColorChange = () => {
    // Verifica se as cores fornecidas são válidas
    if (originalColor.trim() !== "" && newColor.trim() !== "") {
      console.log("Original Color:", originalColor);
      console.log("New Color:", newColor);

      setProducts((prevProducts) => {
        // Mapeia todos os produtos e atualiza as variações da cor original para a nova cor
        const updatedProducts = prevProducts.map((product) => {
          const updatedVariations = product.variations.map((variation) => {
            // Comparação de cores insensível a maiúsculas e minúsculas
            if (variation.color.toLowerCase() === originalColor.toLowerCase()) {
              return {
                ...variation,
                color: newColor,
              };
            }
            return variation;
          });

          return {
            ...product,
            variations: updatedVariations,
          };
        });

        return updatedProducts;
      });

      // Limpa os campos de cor original e nova cor após a mudança
      setOriginalColor("");
      setNewColor("");

      console.log(
        `Cor de todas as URLs de ${originalColor} alterada para: ${newColor}`
      );
    } else {
      console.error("As cores originais e novas não podem estar vazias.");
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
          position: "relative"
        }}
      >
        <main className="main">
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className={styles.h1Container}>
            <h1 style={{ fontSize: "1.5rem", color: "#2A337C" }}>
              Cadastro de produtos
            </h1>
          </div>

          <div >
            <table style={{ margin: "0 auto",  width: "50vw"}}>
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
                                  <div>
                                    <label>
                                      Cor Original:
                                      <select
                                        value={originalColor}
                                        onChange={(e) =>
                                          setOriginalColor(e.target.value)
                                        }
                                      >
                                        <option value="">
                                          Escolher a Cor Original
                                        </option>
                                        {Array.from(
                                          new Set(
                                            products.flatMap((product) =>
                                              product.variations.map(
                                                (variation) =>
                                                  variation.color.toLowerCase()
                                              )
                                            )
                                          )
                                        ).map((color) => (
                                          <option key={color} value={color}>
                                            {color}
                                          </option>
                                        ))}
                                      </select>
                                    </label>
                                    <label>
                                      Nova Cor:
                                      <input
                                        type="text"
                                        value={newColor}
                                        onChange={(e) =>
                                          setNewColor(e.target.value)
                                        }
                                      />
                                    </label>
                                    <button onClick={handleColorChange}>
                                      Mudar Cor
                                    </button>
                                  </div>{" "}
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

                          <div style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"1rem"
                          }}>
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
                    marginTop:"80%"
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
