import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import axios from 'axios';

const CreateProductForm = ({ onClose }) => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: 0.0,
    description: '',
    size: '',
    category: '',
    subcategories: [], // Adicionado campo para subcategorias
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));
  };

  const handleSubcategoriesChange = (e) => {
    // Tratar as subcategorias como uma lista separada por vírgulas
    const subcategories = e.target.value.split(',').map((subcat) => subcat.trim());
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      subcategories,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Enviar dados para o backend usando Axios
      const response = await axios.post('http://localhost:3001/api/admin/product/new', productInfo);
  
      // Verificar se a requisição foi bem-sucedida
      if (response.status === 201) {
        console.log('Produto criado com sucesso');
        // Resetar o estado ou redirecionar após o envio do formulário, conforme necessário
        setProductInfo({
          name: '',
          price: 0.0,
          description: '',
          size: '',
          category: '',
          subcategories: [],
        });
        onClose();
      } else {
        // Lidar com casos de erro
        console.error('Erro ao criar o produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar o produto:', error.message);
    }
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
        <input
          type="text"
          name="category"
          value={productInfo.category}
          onChange={handleInputChange}
        />
      </label>

      {/* Novo campo para subcategorias */}
      <label>
        Subcategorias (separadas por vírgula):
        <input
          type="text"
          name="subcategories"
          value={productInfo.subcategories.join(', ')} // Exibir subcategorias como uma string separada por vírgulas
          onChange={handleSubcategoriesChange}
        />
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
        sx={{ backgroundColor: '#14337C', color: '#FFFFFF' }}
      >
        Criar Produto
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
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
