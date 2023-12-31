import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { SketchPicker, ChromePicker } from "react-color"; // Corrigir importação

import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";
import CloseIcon from "@mui/icons-material/Close";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    size: "",
    category: "",
    subcategory: "",
    images: [
      {
        colors: [
          {
            color: "",
            url: "",
          },
        ],
      },
    ],
    // ... outros campos necessários
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);

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
        console.log("Produto atualizado com sucesso");
        const updatedProducts = await axios.get(
          "http://localhost:3001/api/products"
        );
        setProducts(updatedProducts.data.products);
      } else {
        console.error(
          "Erro ao atualizar produto. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar produto. Detalhes do erro:", error);
    } finally {
      setIsModalOpen(false);

      // Limpar o estado do formulário
      setFormData({
        _id: null,
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        size: "",
        category: "",
        subcategory: "",
        images: [
          {
            colors: [
              {
                color: "",
                url: "",
              },
            ],
          },
        ],
        // ... outros campos necessários
      });

      setSelectedImageIndex(null);
      setSelectedColorIndex(null);
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
                                  quantity: 0,
                                  description: "",
                                  size: "",
                                  category: "",
                                  subcategory: "",
                                  images: [
                                    {
                                      colors: [
                                        {
                                          color: "",
                                          url: "",
                                        },
                                      ],
                                    },
                                  ],
                                  // Add other fields as needed
                                });
                                setSelectedImageIndex(null);
                                setSelectedColorIndex(null);
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
                                  {formData.images &&
                                    formData.images.map((image, imageIndex) => (
                                      <div
                                        key={imageIndex}
                                        className={styles.colorContainer}
                                      >
                                        {image.colors &&
                                          image.colors.map(
                                            (color, colorIndex) => (
                                              <div key={colorIndex}>
                                                <label>
                                                  Cor:
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <div
                                                      className={
                                                        styles.colorPickerPreview
                                                      }
                                                      style={{
                                                        backgroundColor:
                                                          color.color,
                                                      }}
                                                      onClick={() => {
                                                        setSelectedImageIndex(
                                                          imageIndex
                                                        );
                                                        setSelectedColorIndex(
                                                          colorIndex
                                                        );
                                                      }}
                                                    ></div>
                                                    {selectedImageIndex ===
                                                      imageIndex &&
                                                      selectedColorIndex ===
                                                        colorIndex && (
                                                        <ChromePicker
                                                          color={color.color}
                                                          onChange={(
                                                            newColor
                                                          ) => {
                                                            setFormData(
                                                              (prevData) => ({
                                                                ...prevData,
                                                                images:
                                                                  prevData.images.map(
                                                                    (
                                                                      img,
                                                                      iIndex
                                                                    ) =>
                                                                      iIndex ===
                                                                      imageIndex
                                                                        ? {
                                                                            ...img,
                                                                            colors:
                                                                              img.colors.map(
                                                                                (
                                                                                  c,
                                                                                  cIndex
                                                                                ) =>
                                                                                  cIndex ===
                                                                                  colorIndex
                                                                                    ? {
                                                                                        ...c,
                                                                                        color:
                                                                                          newColor.hex,
                                                                                      }
                                                                                    : c
                                                                              ),
                                                                          }
                                                                        : img
                                                                  ),
                                                              })
                                                            );
                                                          }}
                                                        />
                                                      )}
                                                  </div>
                                                </label>
                                                <label>
                                                  URL:
                                                  <Link to={color.url}>
                                                    {`foto${
                                                      colorIndex + 1
                                                    }_${color.color.toLowerCase()}.png`}
                                                  </Link>
                                                </label>
                                              </div>
                                            )
                                          )}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setFormData((prevData) => ({
                                              ...prevData,
                                              images: [
                                                ...prevData.images,
                                                {
                                                  colors: [
                                                    {
                                                      color: "",
                                                      url: "",
                                                    },
                                                  ],
                                                },
                                              ],
                                            }));
                                          }}
                                        >
                                          Adicionar Cor
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setFormData((prevData) => {
                                              const updatedImages = [
                                                ...prevData.images,
                                              ];
                                              updatedImages.splice(
                                                imageIndex,
                                                1
                                              );
                                              return {
                                                ...prevData,
                                                images: updatedImages,
                                              };
                                            });
                                          }}
                                        >
                                          Remover Imagem
                                        </button>
                                      </div>
                                    ))}

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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
