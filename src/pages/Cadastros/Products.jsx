import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";

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
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isUpdateInputOpen, setIsUpdateInputOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

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

  const groupImagesByColor = (variations) => {
    const groupedImages = {};

    variations.forEach((variation) => {
      const color = variation.color;
      const urls = variation.urls;

      if (!groupedImages[color]) {
        groupedImages[color] = [];
      }

      groupedImages[color] = [...groupedImages[color], ...urls];
    });

    return groupedImages;
  };

  // ...

  const handleThumbnailClick = (imageUrl, color, index) => {
    setSelectedThumbnail(imageUrl);
    setIsImageZoomed(true);
    setIsUrlInputOpen(true);
    setZoomedImage(imageUrl);
    setSelectedThumbnailIndex(index);
    setIsImageZoomed((prev) => !prev);
    if (enlargedImage === imageUrl) {
      // Clicking on an already enlarged image, shrink it
      setEnlargedImage(null);
    } else {
      // Clicking on a thumbnail, enlarge it
      setEnlargedImage(imageUrl);
    }
  };
  const closeZoomedImage = () => {
    setIsImageZoomed(false);
    setEnlargedImage(null); // Reset enlarged image when zooming out
  };
  
  const closeSelectedThumbnail = () => {
    setSelectedThumbnail(null);
    setIsImageZoomed(false); // Close zoomed image when the selected thumbnail is closed
    setEnlargedImage(null); // Reset enlarged image
  };
  

  const handleVariationChange = (index, field, value) => {
    setFormData((prevData) => {
      const newVariations = [...prevData.variations];
      newVariations[index][field] = value;
      return { ...prevData, variations: newVariations };
    });
  };

  const addVariation = () => {
    setFormData((prevData) => ({
      ...prevData,
      variations: [...prevData.variations, { color: "", urls: "" }],
    }));
  };

  const removeVariation = (index) => {
    setFormData((prevData) => {
      const newVariations = [...prevData.variations];
      newVariations.splice(index, 1);
      return { ...prevData, variations: newVariations };
    });
  };
// ... (other functions)

const handleVariationUrlChange = (variationIndex, urlIndex, value) => {
  setFormData((prevData) => {
    const newVariations = [...prevData.variations];
    newVariations[variationIndex].urls[urlIndex] = value;
    return { ...prevData, variations: newVariations };
  });
};

const handleUpdateUrl = (variationIndex, urlIndex) => {
  // Implement the logic to update the URL
  console.log("Update URL Logic:", variationIndex, urlIndex, formData.variations[variationIndex].urls[urlIndex]);
  // You can call your API or perform the necessary actions to update the URL
};



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
          position: "relative",
        }}
      >
        <main style={{ position: "sticky" }}>
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
                                  <div className={styles.thumbnailContainer}>
                          {product.variations
                            .reduce((uniqueVariations, variation) => {
                              const existingVariation =
                                uniqueVariations.find(
                                  (v) => v.color === variation.color
                                );

                              if (!existingVariation) {
                                uniqueVariations.push({
                                  ...variation,
                                  urls: [variation.urls[0]],
                                });
                              } else {
                                existingVariation.urls.push(
                                  variation.urls[0]
                                );
                              }

                              return uniqueVariations;
                            }, [])
                            .map((uniqueVariation, index) => (
                              <div
                                key={index}
                                className={styles.thumbnailItem}
                              >
                                <div className={styles.colorName}>
                                  {uniqueVariation.color}
                                </div>
                                {uniqueVariation.urls.map(
                                  (imageUrl, subIndex) => (
                                    <div
                                      key={subIndex}
                                      className={styles.imageContainer}
                                    >
                                      <img
                                        src={imageUrl}
                                        alt={`${uniqueVariation.color}-${subIndex}`}
                                        className={`${styles.thumbnailImage} ${
                                          enlargedImage === imageUrl &&
                                          styles.enlargedImage
                                        }`}
                                        onClick={() =>
                                          handleThumbnailClick(
                                            imageUrl,
                                            uniqueVariation.color,
                                            subIndex
                                          )
                                        }
                                        
                                      />
                                      {/* Add the input field below each image */}
                                      <input
                                       type="text"
                                       placeholder="Nova URL"
                                       value={formData.variations[index].urls[subIndex]}
                                       onChange={(e) =>
                                         handleVariationUrlChange(index, subIndex, e.target.value)
                                       }
                                       className={styles.thumbnailInput}
                                      />
                                      {/* Add a button or logic to update the URL */}
                                      <button onClick={() => handleUpdateUrl(index, subIndex)} className={styles.thumbnailButton}> {/* Add the class for the button */}
  Trocar URL
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
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
