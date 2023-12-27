import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import "./ModalProducts.css"
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
  });

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
  // ... outros códigos ...
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar dados para o backend usando Axios
      const response = await axios.post(
        "http://localhost:3001/api/admin/product/new",
        {
          ...productInfo,
          category: productInfo.category, // Manter o nome da categoria
          subcategory: productInfo.subcategory, // Manter o nome da subcategoria
        }
      );

      // Verificar se a requisição foi bem-sucedida
      if (response.status === 201) {
        console.log("Produto criado com sucesso");
        // Resetar o estado ou redirecionar após o envio do formulário, conforme necessário
        setProductInfo({
          name: "",
          price: 0.0,
          description: "",
          size: "",
          category: "",
          subcategory: "",
        });
        onClose();
      } else {
        // Lidar com casos de erro
        console.error("Erro ao criar o produto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar o produto:", error.message);
    }
  };




   
  // ... outros códigos ...

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
      <label>
        Nome do Produto:
        <input
          type="text"
          name="name"
          value={productInfo.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Preço:
        <input
          type="number"
          name="price"
          value={productInfo.price}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Descrição:
        <textarea
          name="description"
          value={productInfo.description}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Tamanho:
        <input
          type="text"
          name="size"
          value={productInfo.size}
          onChange={handleInputChange}
        />
      </label>

      <label>
      Categoria:
      <select
        className="custom-select" // Adicione uma classe para aplicar estilos
        name="category"
        value={productInfo.category}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Escolha uma categoria
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </label>

    <label>
      Subcategoria:
      <select
        className="custom-select" // Adicione uma classe para aplicar estilos
        name="subcategory"
        value={productInfo.subcategory}
        onChange={handleSubcategoryChange}
      >
        <option value="" disabled>
          Escolha uma subcategoria
        </option>
        {subcategories.map((subcategory) => (
          <option key={subcategory._id} value={subcategory.name}>
            {subcategory.name}
          </option>
        ))}
      </select>
    </label>
      <button type="submit">Criar Produto</button>
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
      backgroundColor: "#14337C", // Mantém a cor de fundo ao passar o mouse
      opacity: 0.9, // Define a opacidade desejada
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

          {/* Incluindo o formulário dentro do modal */}
          <CreateProductForm onClose={handleClose} />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
