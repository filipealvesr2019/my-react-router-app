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
import { SketchPicker } from "react-color"; // Importando o SketchPicker

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
  });

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [imageFileName, setImageFileName] = useState("");

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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFile = files[0]; // Assumindo que estamos lidando com apenas uma imagem

    // Defina parte do nome do arquivo (por exemplo, os primeiros 10 caracteres)
    const partialFileName = imageFile.name.substring(0, 10);

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      imageFiles: [...prevProductInfo.imageFiles, imageFile],
    }));

    setImageFileName(partialFileName);
  };

  // ... restante do código ...

  const handleAddVariation = () => {
    const { color, imageFiles } = productInfo;
    if (color && imageFiles.length > 0) {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        color: "", // Limpar a cor após adicionar
        variations: [
          ...prevProductInfo.variations,
          {
            color,
            images: imageFiles.map((file) => ({
              url: URL.createObjectURL(file),
              fileName: imageFileName, // Adicionar parte do nome do arquivo
            })),
          },
        ],
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { variations, imageFiles, ...productData } = productInfo;

      // Criar um array de Promises para upload de todas as imagens
      const uploadPromises = imageFiles.map((file) => {
        const formData = new FormData();
        formData.append("image", file);
        return axios.post("https://api.imgbb.com/1/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "",
          },
        });
      });

      // Executar todas as Promises de upload
      const imgBbResponses = await Promise.all(uploadPromises);

      // Extrair URLs das respostas do ImgBB
      const imageUrls = imgBbResponses.map(
        (response) => response.data.data.url
      );

      // Montar a estrutura de dados para o backend com URLs das imagens
      const requestData = {
        ...productData,
        category: productInfo.category,
        subcategory: productInfo.subcategory,
        images: variations.map((variation) => ({
          colors: variation.images.map((image, index) => ({
            color: variation.color,
            url: imageUrls[index], // Associar a URL correta
          })),
        })),
      };

      console.log("Dados do Produto:", requestData);

      // Enviar dados para o backend usando Axios
      const response = await axios.post(
        "http://localhost:3001/api/admin/product/new",
        requestData
      );

      if (response.status === 201) {
        console.log("Produto criado com sucesso");

        // Log do novo estado do produto
        console.log("Novo Estado do Produto:", productInfo);

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
        });
        onClose();
      } else {
        console.error("Erro ao criar o produto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar o produto:", error.message);
    }
  };

  // ... restante do código ...

  // ... restante do código ...

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));
  };

  const handleSubcategoryChange = (event) => {
    const subcategoryName = event.target.value;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      subcategory: subcategoryName,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={productInfo.name}
            onChange={handleInputChange}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            name="description"
            value={productInfo.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tamanho"
            variant="outlined"
            fullWidth
            name="size"
            value={productInfo.size}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Categoria</InputLabel>
            <Select
              label="Categoria"
              value={productInfo.category}
              onChange={handleCategoryChange}
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
            label="Quantidade"
            variant="outlined"
            fullWidth
            type="number"
            name="quantity"
            value={productInfo.quantity}
            onChange={handleInputChange}
          />
        </Grid>
  
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cor"
            variant="outlined"
            fullWidth
            name="color"
            value={productInfo.color}
            onClick={handleColorPickerOpen}
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

          {/* Trecho a ser adicionado */}
          {productInfo.color && (
            <div
              style={{
                marginTop: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "0.5rem" }}>Cor Adicionada:</span>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: productInfo.color,
                  border: "1px solid #000",
                  marginRight: "0.5rem",
                }}
              ></div>
              <span>Imagem: {imageFileName}</span>
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
              width: "8dvw",
              fontFamily: "poppins",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: ".8rem",
            }}
          >
            Adicionar Variação
          </Button>
        </Grid>
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
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
          >
            Criar Novo Produto
          </Typography>

          <CreateProductForm onClose={handleClose} />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
