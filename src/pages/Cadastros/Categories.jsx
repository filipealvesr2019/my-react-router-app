import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
// Adicione as seguintes linhas para corrigir o erro
const [availableSubcategories, setAvailableSubcategories] = useState([]);
const [addedSubcategories, setAddedSubcategories] = useState([]);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");

  // ... (outros estados)

  const [editingItem, setEditingItem] = useState(null);

  // Remova quaisquer tentativas de declarar setAvailableSubcategories e setAddedSubcategories

  const [categoryInputError, setCategoryInputError] = useState("");
  const [subcategoryInputError, setSubcategoryInputError] = useState("");

  
  const [editCategoryNameInputError, setEditCategoryNameInputError] = useState("");
  const [editSubcategoryNameInputError, setEditSubcategoryNameInputError] = useState("");

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

  return (
    <div>
     <div className={`addContainer ${categoryInputError ? 'error' : ''}`}>
        <label>
          Adicionar Nova Categoria:
          <div className={`categoryInput ${categoryInputError ? 'error' : ''}`}>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div style={{ color: 'red' }}>{categoryInputError}</div>
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
                  <>
                    <input
                      type="text"
                      value={
                        editingItem === category._id
                          ? editCategoryName
                          : category.name
                      }
                      onChange={(e) => setEditCategoryName(e.target.value)}
                    />

                    <button onClick={() => editCategory(category)} className="salvar">
                      Salvar
                    </button>
                  </>
                ) : (
                  // Se não estiver editando, exibe o nome normal
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
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      style={{
                        gap: ".5rem",
                        fontSize: "1rem",
                        backgroundColor: "#FFC2C5",
                        color: "red",
                        border: 0,
                        fontWeight: "bold",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        width: "8dvw",
                        height:"7dvh",
                        borderRadius: "5px"
                      }}
                    >
                      <img src="https://i.ibb.co/SsZjWVS/bin.png" alt="" />{" "}
                      Excluir
                    </button>
                  </div>
                ) : // Se estiver editando, não exibe botões de ação
                null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`addContainer ${subcategoryInputError ? 'error' : ''}`}>
        <label>
          Adicionar Nova Subcategoria:
          <div className={`categoryInput ${subcategoryInputError ? 'error' : ''}`}>
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
          </div>
          <div style={{ color: 'red' }}>{subcategoryInputError}</div>
          <button onClick={addSubcategory} className="categoryButton">
            Adicionar Subcategoria
          </button>
        </label>
      </div>
      {/* Tabela para Todas Subcategorias */}
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
                  <>
                    <input
                      type="text"
                      value={
                        editingItem === sub._id ? editSubcategoryName : sub.name
                      }
                      onChange={(e) => setEditSubcategoryName(e.target.value)}
                    />
                    <button onClick={() => editSubcategory(sub)} className="salvar">Salvar</button>
                  </>
                ) : (
                  // Se não estiver editando, exibe o nome normal
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
                    <button
                      onClick={() => handleDeleteSubcategory(sub)}
                      style={{
                        gap: ".5rem",
                        fontSize: "1rem",
                        backgroundColor: "#FFC2C5",
                        color: "red",
                        border: 0,
                        fontWeight: "bold",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        width: "8dvw",
                        height:"7dvh",
                        borderRadius: "5px"
                      }}
                    >
                      <img src="https://i.ibb.co/SsZjWVS/bin.png" alt="" />{" "}
                      Excluir{" "}
                    </button>
                  </div>
                ) : // Se estiver editando, não exibe botões de ação
                null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
