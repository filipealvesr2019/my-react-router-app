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
import { SketchPicker } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@mui/icons-material/Check";
const CreateProductForm = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0.0,
    description: "",
    size: "",
    category: "",
    subcategory: "",
    quantity: 0,
    variations: [], // Array de variações (cores e imagens)
    imageFiles: [], // Novo campo para arquivos de imagem
    colorPickerOpen: false,
    colorPortuguese: "",
  imageUrls: [],
  imageUrl: "",  // Adicione este campo para armazenar a URL da imagem
  color: "",   

  });
  const [isColorAdded, setIsColorAdded] = useState(false);

  const [imageFileName, setImageFileName] = useState("");

  // Novo estado para rastrear os erros
  const [formErrors, setFormErrors] = useState({});

  // Função para verificar se há campos obrigatórios não preenchidos
  const validateForm = () => {
    const errors = {};

    // Adicione validações para outros campos conforme necessário
    if (!productInfo.name.trim()) {
      errors.name = "Digite o nome do produto";
    }
    if (productInfo.price <= 0) {
      errors.price = "Digite um preço válido";
    }
    if (!productInfo.description.trim()) {
      errors.description = "Digite a descrição do produto";
    }
    // Adicione validações para outros campos conforme necessário
    if (!(productInfo.quantity > 0)) {
      errors.quantity = "Digite uma quantidade válida";
    }
    if (productInfo.size === "") {
      errors.size = "Digite um tamanho válida";
    }

    if (!(productInfo.color === "")) {
      errors.color = "Digite uma cor válida";
    }
    // Verificar se há variações adicionadas

    if (!productInfo.category) {
      errors.category = "Selecione uma categoria";
    }

    if (!productInfo.subcategory) {
      errors.subcategory = "Selecione uma subcategoria";
    }

    setFormErrors(errors);

    // Retorna verdadeiro se não houver erros
    return Object.keys(errors).length === 0;
  };

  const handleColorPickerOpen = () => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      colorPickerOpen: true,
    }));
  };
  const handleColorPickerClose = (event) => {
    // Check if the click event originated from the color picker
    if (event.target.closest(".sketch-picker")) {
      return;
    }

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      colorPickerOpen: false,
    }));
  };

  const handleColorChangeComplete = (color) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      color: color.hex,
    }));
    handleColorPickerClose();
  };
  
  const handleColorChange = (color, event) => {
    event.stopPropagation();
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      color: color.hex,
    }));
  };
  

  useEffect(() => {
    // Carregar categorias ao montar o componente
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/admin/categories");
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





  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
  
    if (files.length > 0) {
      const imageFile = files[0];
  
      if (imageFile) {
        // Set the image file to the state
        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          imageFiles: [imageFile],
        }));
  
        setImageFileName(imageFile.name.substring(0, 10));
      } else {
        console.error("No file selected");
      }
    } else {
      console.error("No file selected");
    }
  };

  const handleAddVariation = () => {
    const { color, imageUrl } = productInfo;
  
    console.log("Color and Image URL before adding variation:", color, imageUrl);
  
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
  
const handleInputChange = (event) => {
  const { name, value } = event.target;

  setProductInfo((prevProductInfo) => ({
    ...prevProductInfo,
    [name]: value,
  }));

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
  console.log("State Before Sending to Server:", productInfo);

  // Validate the form before proceeding
  if (!validateForm()) {
    toast.error("All fields must be filled!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    return;
  }

  try {
    const { imageUrl, ...productData } = productInfo;

    // Include the image URL in the product data
    productData.imageUrl = imageUrl;

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
        size: "",
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
      toast.success("Product added successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      console.error("Error creating product:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating product:", error.message);
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
        <Grid item xs={12} sm={6} style={{ marginTop: "-1rem" }}>
          <TextField
            label="Tamanho"
            variant="outlined"
            fullWidth
            name="size"
            value={productInfo.size}
            onChange={handleInputChange}
            error={formErrors.size !== undefined}
            helperText={formErrors.size}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />
        </Grid>
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
      style: { marginTop: "10px" },
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
          marginTop:"-10rem",
          marginBottom:"18rem",
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
