import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { SketchPicker, ChromePicker } from "react-color"; // Corrigir importação
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ModelProducts from "../../components/ModelProducts";
import DeleteModal from "../../components/DeleteModal";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedColorPickerIndex, setSelectedColorPickerIndex] =
    useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

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
        urls: "", // Assuming urls is a string
      },
    ],
    // ... other necessary fields
    // ... outros campos necessários
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

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
        `http://localhost:3001/api/products?page=${currentPage}`
      );

      console.log("API Response:", response.data);

      const totalProducts = response.data.productsCount;
      const validItemsPerPage = Number.isFinite(itemsPerPage) && itemsPerPage > 0;

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
        console.log("Products after fetching:", response.data.products);

        setProducts(updatedProducts.data.products);
      } else {
        console.error(
          "Erro ao atualizar produto. Mensagem do servidor:",
          response.data.error
        );
      }
      setIsColorPickerOpen(false);
      setSelectedColorPickerIndex(null);
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
        variations: [
          {
            color: "", // Assuming color is a string
            urls: "", // Assuming urls is a string
          },
        ],
        // ... other necessary fields. outros campos necessários
      });

      setSelectedImageIndex(null);
      setSelectedColorPickerIndex(null);
      setIsColorPickerOpen(false);
    }
  };

  console.log("Total Pages:", totalPages);

  return (
    <div className={styles.container}>
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
                                      urls: "", // Assuming urls is a string
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
                                  {formData.variations &&
                                    formData.variations.map(
                                      (variation, variationIndex) => (
                                        <div
                                          className={styles.colorContainer}
                                          key={variationIndex}
                                        >
                                          {/* Bolinha de cor */}
                                          <div
                                            className={
                                              styles.colorPickerPreview
                                            }
                                            style={{
                                              backgroundColor: variation.color,
                                            }}
                                            onClick={() => {
                                              setSelectedImageIndex(
                                                variationIndex
                                              );
                                              setSelectedColorPickerIndex(
                                                (prevIndex) =>
                                                  prevIndex === variationIndex
                                                    ? null
                                                    : variationIndex
                                              );
                                              setIsColorPickerOpen(
                                                (prev) => !prev
                                              );
                                            }}
                                          ></div>

                                          {selectedImageIndex ===
                                            variationIndex && (
                                            <div>
                                              <ChromePicker
                                                color={variation.color}
                                                onChange={(newColor) => {
                                                  const newVariations = [
                                                    ...formData.variations,
                                                  ];
                                                  newVariations[
                                                    variationIndex
                                                  ] = {
                                                    ...newVariations[
                                                      variationIndex
                                                    ],
                                                    color: newColor.hex,
                                                  };
                                                  setFormData((prevData) => ({
                                                    ...prevData,
                                                    variations: newVariations,
                                                  }));
                                                }}
                                                display={
                                                  selectedColorPickerIndex ===
                                                    variationIndex &&
                                                  isColorPickerOpen
                                                    ? "block"
                                                    : "none"
                                                }
                                              />
                                              {/* Add the "Atualizar Cor" button here */}
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation(); // Evita que o clique se propague para o div pai (colorContainer)
                                                  setIsColorPickerOpen(false); // Fecha apenas o seletor de cores
                                                  setSelectedColorPickerIndex(
                                                    null
                                                  );
                                                }}
                                              >
                                                Atualizar Cor
                                              </button>
                                            </div>
                                          )}

                                          {/* Seletor de fotos */}
                                          <select
                                            value={variation.urls}
                                            onChange={(e) => {
                                              const newVariations = [
                                                ...formData.variations,
                                              ];
                                              newVariations[
                                                variationIndex
                                              ].urls = e.target.value;
                                              setFormData((prevData) => ({
                                                ...prevData,
                                                variations: newVariations,
                                              }));
                                            }}
                                          >
                                            <option value="">
                                              Selecionar Foto
                                            </option>
                                            {/* Adicione as opções do seletor de fotos aqui */}
                                            {/* ... */}
                                          </select>
                                        </div>
                                      )
                                    )}
                                  // ... (código posterior)
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
              <Pagination
                count={isNaN(totalPages) ? 1 : totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                style={{marginBottom:"2rem"}}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
