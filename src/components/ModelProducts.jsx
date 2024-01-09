import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import "./ModalProducts.css";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductForm = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isColorAdded, setIsColorAdded] = useState(false);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0.0,
    description: "",
    sizes: [], // Change from size to sizes
    category: "",
    subcategory: "",
    quantity: 0,
    variations: [], // Array de variações (cores e imagens)
    imageFiles: [], // Novo campo para arquivos de imagem
    colorPickerOpen: false,
    colorPortuguese: "",
    imageUrls: [],
    imageUrl: "", // Adicione este campo para armazenar a URL da imagem
    color: "",
  });

  const [size, setSize] = useState("");

  // Novo estado para rastrear os erros
  const [formErrors, setFormErrors] = useState({});

  // Função para verificar se há campos obrigatórios não preenchidos
  const validateForm = () => {
    const errors = {};

    // Adicione validações para outros campos conforme necessário
    if (!productInfo.name.trim()) {
      errors.name = "";
    }
    if (productInfo.price <= 0) {
      errors.price = "";
    }
    if (!productInfo.description.trim()) {
      errors.description = "";
    }
    // Adicione validações para outros campos conforme necessário
    if (!(productInfo.quantity > 0)) {
      errors.quantity = "";
    }
    if (productInfo.sizes.length === 0) {
      errors.size = "";
    }
    if (!productInfo.colorPortuguese.trim()) {
      errors.colorPortuguese = "";
    }
    
    if (!productInfo.imageUrl.length === 0) {
      errors.imageUrl = "";
    }
    // Verificar se há variações adicionadas

    if (!productInfo.category) {
      errors.category = "";
    }

    if (!productInfo.subcategory) {
      errors.subcategory = "";
    }

    setFormErrors(errors);

    // Retorna verdadeiro se não houver erros
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    // Carregar categorias ao montar o componente
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/admin/categories"
      );
      const { success, categories } = response.data;

      if (success) {
        if (Array.isArray(categories)) {
          setCategories(categories);
        } else {
          console.error("Os dados recebidos não são uma matriz:", categories);
        }
      } else {
        console.error(
          "A solicitação para obter categorias não foi bem-sucedida."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error.message);
    }
  };

  const handleCategoryChange = async (event) => {
    const categoryName = event.target.value;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      category: categoryName,
      subcategory: "", // Resetar a subcategoria quando a categoria for alterada
    }));

    try {
      // Obter subcategorias com base no nome da categoria selecionada
      const subcategoryResponse = await axios.get(
        `http://localhost:3001/api/admin/subcategories?categoryName=${encodeURIComponent(
          categoryName
        )}`
      );
      const subcategoryData = subcategoryResponse.data;

      if (subcategoryData && Array.isArray(subcategoryData.subcategories)) {
        const subcategoriesArray = subcategoryData.subcategories;
        console.log("Subcategorias recebidas:", subcategoriesArray);
        setSubcategories(subcategoriesArray);
      } else {
        console.error(
          "Os dados recebidos não são uma matriz:",
          subcategoryData
        );
      }
    } catch (error) {
      console.error("Erro ao buscar subcategorias:", error);
    }
  };

  const handleAddVariation = () => {
    const { color, imageUrl } = productInfo;

    console.log(
      "Color and Image URL before adding variation:",
      color,
      imageUrl
    );

    // Make sure the image URL is set correctly
    if (color && imageUrl) {
      // Continue with processing, such as adding color and URL to your variations list

      // Example: Add to the variations list
      setProductInfo((prevProductInfo) => {
        const updatedVariations = [
          ...prevProductInfo.variations,
          { color, urls: [imageUrl] }, // Adjusted structure to match your model
        ];
        return {
          ...prevProductInfo,
          color: "",
          imageUrl: "",
          variations: updatedVariations,
        };
      });

      // Clear the fields and states
      setIsColorAdded(true);

      // Display success message
      toast.success("Color and image URL added successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      console.error("Color or image URL is empty");
    }
  };

  // Update the handleInputChange function to handle the size input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));

    // Handle size input separately
    if (name === "size") {
      console.log("Setting size:", value);
      setSize(value);
    }

    // Handle color input separately
    if (name === "colorPortuguese") {
      // Update the state for the color
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        color: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) {
      toast.error("Todos os campos devem ser preenchidos!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    try {
      const { sizes, imageUrl, ...productData } = productInfo;
      productData.size = sizes.join(", "); // Certifique-se de que você está usando 'size' e não 'sizes'

      // Send the product data to the server for further processing
      const response = await axios.post(
        "http://localhost:3001/api/admin/product/new",
        productData
      );

      if (response.status === 201) {
        setProductInfo({
          name: "",
          price: 0.0,
          description: "",
          sizes: sizes,
          category: "",
          subcategory: "",
          quantity: 0,
          variations: [],
          imageUrl: "", // Clear the image URL
        });

        console.log("Product created successfully");

        setTimeout(() => {
          onClose();
        }, 4000);

        // Configuration to display the success message
        // setIsProductCreated(true);

        // Display success message
        toast.success("Producto criado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        // Handle the case where the server returns an error status
        console.error("Erro ao criar produto!:", response.statusText);

        // Display an error message
        toast.error("Erro ao criar produto. Tente novamente mais tarde.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Erro ao criar produto:", error.message);

      // Display an error message
      toast.error("Erro inesperado. Tente novamente mais tarde.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const handleSubcategoryChange = (event) => {
    const subcategoryName = event.target.value;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      subcategory: subcategoryName,
    }));
  };

  const handleImageUrlsChange = (event) => {
    const { value } = event.target;
    // Set the image URL to the state
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      imageUrl: value,
    }));
  };

  const handleAddSize = () => {
    const { size } = productInfo;
    if (size.trim() !== "") {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        sizes: [...prevProductInfo.sizes, size],
      }));
      // Limpe o campo de tamanho após adicionar
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        size: "",
      }));
      toast.success("Tamanho adicionado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  // ...
  return (
    <form onSubmit={handleSubmit}>
      {formErrors.variations && (
        <Typography variant="caption" color="error">
          {formErrors.variations}
        </Typography>
      )}

      <Grid container spacing={2} style={{ marginTop: "-2rem" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={productInfo.name}
            onChange={handleInputChange}
            error={formErrors.name !== undefined}
            helperText={formErrors.name}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            type="number"
            name="price"
            value={productInfo.price}
            onChange={handleInputChange}
            error={formErrors.price !== undefined}
            helperText={formErrors.price}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "-1rem" }}>
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            name="description"
            value={productInfo.description}
            onChange={handleInputChange}
            error={formErrors.description !== undefined}
            helperText={formErrors.description}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />
        </Grid>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginLeft: "1rem",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tamanho"
              variant="outlined"
              fullWidth
              name="size"
              value={productInfo.size}
              onChange={handleInputChange}
              error={formErrors.size !== undefined}
              helperText={formErrors.size}
              inputProps={{
                style: {
                  marginTop: "10px",
                },
              }}
            />
          </Grid>
          <Button onClick={handleAddSize} style={{ height: "5dvh" }}>
            Adicionar Tamanho
          </Button>
        </div>

        <Grid item xs={12} sm={6} style={{ marginTop: "-1rem" }}>
          <TextField
            label="Quantidade"
            variant="outlined"
            fullWidth
            type="number"
            name="quantity"
            value={productInfo.quantity}
            onChange={handleInputChange}
            error={formErrors.quantity !== undefined}
            helperText={formErrors.quantity}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Categoria</InputLabel>
            <Select
              label="Categoria"
              value={productInfo.category}
              onChange={handleCategoryChange}
              error={formErrors.category !== undefined}
              helperText={formErrors.category}
              InputProps={{
                style: { marginTop: "10px" },
              }}
            >
              <MenuItem value="" disabled>
                Escolha uma categoria
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Subcategoria</InputLabel>
            <Select
              label="Subcategoria"
              value={productInfo.subcategory}
              onChange={handleSubcategoryChange}
              error={formErrors.subcategory !== undefined}
              helperText={formErrors.subcategory}
              InputProps={{
                style: { marginTop: "10px" },
              }}
            >
              <MenuItem value="" disabled>
                Escolha uma subcategoria
              </MenuItem>
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory.name}>
                  {subcategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cor em Português"
            variant="outlined"
            fullWidth
            name="colorPortuguese"
            value={productInfo.color}
            onChange={handleInputChange}
            error={formErrors.colorPortuguese !== undefined}
            helperText={formErrors.colorPortuguese}
            InputProps={{
              style: {
                marginTop: "10px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="URL da Imagem"
            variant="outlined"
            fullWidth
            name="imageUrl"
            value={productInfo.imageUrl}
            error={formErrors.imageUrl !== undefined}
            helperText={formErrors.imageUrl}
            onChange={handleImageUrlsChange}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleAddVariation}
            style={{
              backgroundColor: "#14337C",
              color: "white",
              border: "none",
              padding: ".5rem",
              borderRadius: "1rem",
              width: "15dvw",
              fontFamily: "poppins",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: ".8rem",
              whiteSpace: "nowrap",
              marginTop: "1.3rem",
            }}
          >
            Adicionar foto a Cor
          </Button>
        </Grid>
      </Grid>
      <Button
        style={{
          backgroundColor: "#14337C",
          color: "white",
          border: "none",
          padding: ".5rem",
          borderRadius: "1rem",
          width: "8dvw",
          fontFamily: "poppins",
          fontWeight: 500,
          cursor: "pointer",
          fontSize: ".8rem",
          marginTop: ".4rem",
        }}
        type="submit"
      >
        Criar Produto
      </Button>
    </form>
  );
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#14337C",
          color: "#FFFFFF",
          marginTop: "-15rem",
          marginBottom: "54%",
          "&:hover": {
            backgroundColor: "#14337C",
            opacity: 0.9,
          },
        }}
      >
        Criar Produto
      </Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            marginTop={"-rem"}
          >
            Criar Novo Produto
          </Typography>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <CreateProductForm onClose={handleClose} />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
