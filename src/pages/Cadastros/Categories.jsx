import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // Adicione as seguintes linhas para corrigir o erro

  const [editCategoryName, setEditCategoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");

  // Adicione esses estados ao início do componente

  // ... (outros estados)

  const [editingItem, setEditingItem] = useState(null);

  // Remova quaisquer tentativas de declarar setAvailableSubcategories e setAddedSubcategories

  const [categoryInputError, setCategoryInputError] = useState("");
  const [subcategoryInputError, setSubcategoryInputError] = useState("");

  const [editCategoryNameInputError, setEditCategoryNameInputError] =
    useState("");
  const [editSubcategoryNameInputError, setEditSubcategoryNameInputError] =
    useState("");

  const validateForm = () => {
    const errors = {};

    if (!newCategory.trim()) {
      errors.newCategory = "Digite o nome da categoria";
    }

    if (!newSubcategory.trim()) {
      errors.newSubcategory = "Digite o nome da subcategoria";
    }

    console.log("Errors:", errors);

    setCategoryInputError(errors.newCategory);
    setSubcategoryInputError(errors.newSubcategory);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    // Ao montar o componente, carrega categorias e subcategorias
    getCategories();
    getSubcategories();
    loadAvailableSubcategories(); // Mova esta linha para cá
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/admin/categories"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Erro ao obter categorias", error);
    }
  };

  const getSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/admin/subcategories?category=${categoryId}`
      );
      setSubcategories(response.data.subcategories);
      setSelectedCategoryId(categoryId);
      // Carrega subcategorias adicionadas à categoria selecionada
      getAddedSubcategories(categoryId);
      // Carrega subcategorias disponíveis para adicionar à categoria
      loadAvailableSubcategories();
    } catch (error) {
      console.error("Erro ao obter subcategorias", error);
    }
  };

  const loadAvailableSubcategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/admin/subcategories`
      );
      setAvailableSubcategories(response.data.subcategories);
    } catch (error) {
      console.error("Erro ao obter subcategorias disponíveis", error);
    }
  };

  const getAddedSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/admin/subcategories?category=${categoryId}`
      );
      setAddedSubcategories(response.data.subcategories);
    } catch (error) {
      console.error("Erro ao obter subcategorias adicionadas", error);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) {
      setCategoryInputError("Digite o nome da categoria");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/admin/category/new",
        {
          name: newCategory,
        }
      );

      if (response.data.success) {
        setNewCategory("");
        getCategories();
        setCategoryInputError("");
        toast.success("Categoria adicionada com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        console.error(
          "Erro ao criar categoria. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao criar categoria", error);
    }
  };
  const addSubcategory = async () => {
    if (!newSubcategory.trim()) {
      setSubcategoryInputError("Digite o nome da subcategoria");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/admin/subcategories/new",
        {
          name: newSubcategory,
          category: selectedCategoryId, // Adicione a categoria associada à subcategoria
        }
      );

      if (response.data.success) {
        setNewSubcategory("");
        getSubcategories(selectedCategoryId);
        getAddedSubcategories(selectedCategoryId);
        // Limpar a mensagem de erro após a operação bem-sucedida
        setSubcategoryInputError("");
        toast.success("Subcategoria adicionada com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        console.error(
          "Erro ao criar subcategoria. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao criar subcategoria", error);
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/admin/categories/${category._id}`
      );

      if (response.data.success) {
        console.log("Categoria excluída com sucesso");
        getCategories();
        setItemToDelete(category);
        setDeleteConfirmationDialogOpen(true);
      } else {
        console.error(
          "Erro ao excluir categoria. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao excluir categoria", error);
    }
  };

  const handleDeleteSubcategory = async (sub) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/admin/subcategories/${sub._id}`
      );

      if (response.data.success) {
        console.log("Subcategoria excluída com sucesso");
        getSubcategories(selectedCategoryId);
        getAddedSubcategories(selectedCategoryId);
        setItemToDelete(sub);
        setDeleteConfirmationDialogOpen(true);
      } else {
        console.error(
          "Erro ao excluir subcategoria. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao excluir subcategoria", error);
    }
  };

  const editCategory = async (category) => {
    try {
      if (editCategoryName.trim() === "") {
        // Exibe uma mensagem de erro e retorna sem fazer a edição
        setEditCategoryNameInputError("Digite o nome da categoria");
        return;
      } else {
        // Limpa a mensagem de erro se o campo não estiver vazio
        setEditCategoryNameInputError("");
      }

      const response = await axios.put(
        `http://localhost:3001/api/admin/categories/${category._id}`,
        {
          name: editCategoryName,
        }
      );

      if (response.data.success) {
        console.log("Categoria editada com sucesso");
        setEditingItem(null); // Limpar o estado de edição
        setEditCategoryName(""); // Limpar o estado de edição do nome da categoria
        getCategories();
        setEditCategoryName(""); // Limpar o estado de edição do nome da categoria
      } else {
        console.error(
          "Erro ao editar categoria. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao editar categoria", error);
    }
  };

  const editSubcategory = async (sub) => {
    try {
      if (editSubcategoryName.trim() === "") {
        // Exibe uma mensagem de erro e retorna sem fazer a edição
        setEditSubcategoryNameInputError("Digite o nome da subcategoria");
        return;
      } else {
        // Limpa a mensagem de erro se o campo não estiver vazio
        setEditSubcategoryNameInputError("");
      }
      const response = await axios.put(
        `http://localhost:3001/api/admin/subcategories/${sub._id}`,
        {
          name: editSubcategoryName,
        }
      );

      if (response.data.success) {
        console.log("Subcategoria editada com sucesso");
        setEditingItem(null); // Limpar o estado de edição
        setEditSubcategoryName(""); // Limpar o estado de edição do nome da subcategoria
        getSubcategories(selectedCategoryId);
        getAddedSubcategories(selectedCategoryId);
      } else {
        console.error(
          "Erro ao editar subcategoria. Mensagem do servidor:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Erro ao editar subcategoria", error);
    }
  };
  // Adicione esses estados ao início do componente
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);

  const openDeleteConfirmationDialog = () => {
    setDeleteConfirmationDialogOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      if (itemToDelete.category) {
        // Lógica para excluir a categoria
        await handleDeleteCategory(itemToDelete);
      } else {
        // Lógica para excluir a subcategoria
        await handleDeleteSubcategory(itemToDelete);
      }
    }

    // Limpar o estado do item a ser excluído e fechar o modal
    setItemToDelete(null);
    setDeleteConfirmationDialogOpen(false);
  };

  return (
    <div style={{}}>
          <ToastContainer position="top-right" autoClose={5000} />

      <div className={`addContainer ${categoryInputError ? "error" : ""}`}>
        <label>
          Adicionar Nova Categoria:
          <div className={`categoryInput ${categoryInputError ? "error" : ""}`}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div style={{ color: "red" }}>{categoryInputError}</div>
          <button onClick={addCategory} className="categoryButton">
            Adicionar Categoria
          </button>
        </label>
      </div>
      {/* Tabela para Todas Categorias */}
      <table className="category-table">
        <thead>
          <tr>
            <th className="Categorias">Todas Categorias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>
                {editingItem === category._id ? (
                  // Se estiver editando, exibe o campo de edição
                  <div
                    className={`EditCategory ${
                      editCategoryNameInputError ? "error" : ""
                    }`}
                  >
                    <input
                      type="text"
                      value={
                        editingItem === category._id
                          ? editCategoryName
                          : category.name
                      }
                      onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    <div style={{ color: "red" }}>
                      {editCategoryNameInputError}
                    </div>
                    <button
                      onClick={() => editCategory(category)}
                      className="salvar"
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  // Se não estiver editando, exibe o nome da categoria
                  category.name
                )}
              </td>
              <td>
                {editingItem !== category._id ? (
                  // Apenas exibe os botões de ação se não estiver editando
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => setEditingItem(category._id)}
                      className="buttonUpdate"
                    >
                      <img src="https://i.ibb.co/5R1QnT7/edit-1.png" alt="" />
                      Editar
                    </button>
                    <Button
                      variant="outlined"
                      color="danger"
                      endDecorator={<DeleteForever />}
                      onClick={() => handleDeleteCategory(category)} // Corrigir chamada para a função de exclusão
                      style={{ height: "7vh", marginTop: ".2rem" }}
                    >
                      Excluir
                    </Button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`addContainer ${subcategoryInputError ? "error" : ""}`}>
        <label>
          Adicionar Nova Subcategoria:
          <div
            className={`categoryInput ${subcategoryInputError ? "error" : ""}`}
          >
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
          </div>
          <div style={{ color: "red" }}>{subcategoryInputError}</div>
          <button onClick={addSubcategory} className="categoryButton">
            Adicionar Subcategoria
          </button>
        </label>
      </div>
      {/* Tabela para Todas Subcategorias */}

      <table className="category-table">
        <thead>
          <tr>
            <th className="Categorias">Todas Subcategorias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub) => (
            <tr key={sub._id}>
              <td>
                {editingItem === sub._id ? (
                  // Se estiver editando, exibe o campo de edição
                  <div
                    className={`EditCategory ${
                      editSubcategoryNameInputError ? "error" : ""
                    }`}
                  >
                    <input
                      type="text"
                      value={
                        editingItem === sub._id ? editSubcategoryName : sub.name
                      }
                      onChange={(e) => setEditSubcategoryName(e.target.value)}
                    />
                    <div style={{ color: "red" }}>
                      {editSubcategoryNameInputError}
                    </div>
                    <button
                      onClick={() => editSubcategory(sub)}
                      className="salvar"
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  // Se não estiver editando, exibe o nome da subcategoria
                  sub.name
                )}
              </td>
              <td>
                {editingItem !== sub._id ? (
                  // Apenas exibe os botões de ação se não estiver editando
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => setEditingItem(sub._id)}
                      className="buttonUpdate"
                    >
                      <img src="https://i.ibb.co/5R1QnT7/edit-1.png" alt="" />
                      Editar
                    </button>
                    <Button
                      variant="outlined"
                      color="danger"
                      endDecorator={<DeleteForever />}
                      onClick={() => handleDeleteSubcategory(sub)} // Corrigir chamada para a função de exclusão
                      style={{ height: "7vh", marginTop: ".2rem" }}
                    >
                      Excluir
                    </Button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderizar o modal */}
      <Modal
        open={deleteConfirmationDialogOpen}
        onClose={closeDeleteConfirmationDialog}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Alerta
          </DialogTitle>
          <DialogContent>
            Tem certeza de que quer excluir essa Categoria ou Subcategoria.
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={confirmDelete}>
              Excluir
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={closeDeleteConfirmationDialog}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default Categories;
