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
    color: "", // Adicione esta linha
    urls: "", // Adicione esta linha

  });

  
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
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

  const handleColorPickerOpen = (event) => {
    // Impedir que o evento se propague para evitar o fechamento automático
    event.stopPropagation();
    setColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setColorPickerOpen(false);
  };

  const handleColorChangeComplete = (color) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      color: color.hex,
    }));
    handleColorPickerClose();
  };

  // Adicione um novo evento para impedir a propagação quando a barra de cores é movida
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
      const response = await axios.get("http://localhost:3001/api/categories");
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
  
  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));

    // Handle color input separately
    if (name === "color") {
      handleColorChange(value, event);
    }
  };

  const handleSubcategoryChange = (event) => {
    const subcategoryName = event.target.value;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      subcategory: subcategoryName,
    }));
  };














  
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Verificar se a matriz de arquivos não está vazia
    if (files.length > 0) {
      const imageFile = files[0];

      // Verificar se imageFile não está indefinido
      if (imageFile) {
        const partialFileName = imageFile.name.substring(0, 10);

        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          imageFiles: [...prevProductInfo.imageFiles, imageFile],
        }));

        setImageFileName(partialFileName);
      } else {
        console.error("Nenhum arquivo selecionado");
      }
    } else {
      console.error("Nenhum arquivo selecionado");
    }
  };

  const handleAddVariation = () => {
    const { color, imageFiles } = productInfo;

    // Adicionar variação apenas se houver uma cor e pelo menos uma imagem
    if (color && imageFiles.length > 0) {
      const existingVariationIndex = productInfo.variations.findIndex(
        (variation) => variation.color === color
      );

      if (existingVariationIndex !== -1) {
        const updatedVariations = [...productInfo.variations];
        updatedVariations[existingVariationIndex].images.push(
          ...imageFiles.map((file) => ({
            url: URL.createObjectURL(file),
            fileName: imageFileName,
          }))
        );

        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          color: "",
          variations: updatedVariations,
        }));
      } else {
        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          color: "",
          variations: [
            ...prevProductInfo.variations,
            {
              color,
              images: imageFiles.map((file) => ({
                url: URL.createObjectURL(file),
                fileName: imageFileName,
              })),
            },
          ],
        }));
      }

      console.log('productInfo após adição de variação:', productInfo);
    } else {
      console.error("Cor ou imagens ausentes para adição de variação");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validar o formulário antes de prosseguir
    if (!validateForm()) {
      toast.error("Todos os campos devem ser preenchidos!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
  
    // Construir objeto de dados para enviar ao backend
    const formData = {
      ...productInfo,
      imageUrls: productInfo.imageFiles.map(file => file.url), // Adicione esta linha
    };
  
    // Display success message
    toast.success("Produto criado com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  
    try {
      // Enviar o formData para o backend
      const response = await axios.post(
        "http://localhost:3001/api/admin/product/new",
        formData
      );
  
      // Verificar a resposta do backend
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
          imageFiles: [],
          color: "",
        });
  
        console.log("Produto criado com sucesso");
  
        // Fechar o modal após o sucesso
        setTimeout(() => {
          onClose();
        }, 4000);
      } else {
        console.error("Erro ao criar produto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar produto:", error.message);
    }
  };
  
  // ... (restante do código)

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
            label="Cor"
            variant="outlined"
            fullWidth
            name="color"
            value={productInfo.color}
            onClick={handleColorPickerOpen}
            onChange={handleInputChange} // Use handleInputChange for color changes
            error={formErrors.color !== undefined}
            helperText={formErrors.color}
            InputProps={{
              style: { marginTop: "10px" },
            }}
          />

          {colorPickerOpen && (
            <div
              style={{ position: "absolute", zIndex: 2, top: "1rem" }}
              onClick={(event) => event.stopPropagation()}
            >
              <SketchPicker
                color={productInfo.color}
                onChangeComplete={handleColorChangeComplete}
                onChange={(color, event) => handleColorChange(color, event)}
              />
            </div>
          )}

          {productInfo.color && (
            <div
              style={{
                marginTop: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: "0.5rem",
                  whiteSpace: "nowrap",
                  marginBottom: "-.5rem",
                }}
              >
                Cor Adicionada:
              </span>
              <div
                style={{
                  width: "50px",
                  height: "20px",
                  backgroundColor: productInfo.color,
                  border: "1px solid red",
                }}
              ></div>
              <span style={{ whiteSpace: "nowrap", marginLeft: "5rem" }}>
                Imagem: {imageFileName}
              </span>
            </div>
          )}
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
            Adicionar cor e foto
          </Button>
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "-1rem" }}
          />
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
