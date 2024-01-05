import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [addedSubcategories, setAddedSubcategories] = useState([]);
   

const [editCategoryName, setEditCategoryName] = useState('');
const [editSubcategoryName, setEditSubcategoryName] = useState('');

// ...
    const [editingItem, setEditingItem] = useState(null);
    const [editItemName, setEditItemName] = useState('');
    useEffect(() => {
        // Ao montar o componente, carrega categorias e subcategorias
        getCategories();
        getSubcategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Erro ao obter categorias', error);
        }
    };

    const getSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/admin/subcategories?category=${categoryId}`);
            setSubcategories(response.data.subcategories);
            setSelectedCategoryId(categoryId);
            // Carrega subcategorias disponíveis para adicionar à categoria
            loadAvailableSubcategories();
        } catch (error) {
            console.error('Erro ao obter subcategorias', error);
        }
    };

    const loadAvailableSubcategories = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/admin/subcategories`);
            setAvailableSubcategories(response.data.subcategories);
        } catch (error) {
            console.error('Erro ao obter subcategorias disponíveis', error);
        }
    };

    const addSubcategoryToCategory = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/admin/subcategories/new', {
                name: newSubcategory,
                category: selectedCategoryId,
            });

            if (response.data.success) {
                setNewSubcategory('');
                getSubcategories(selectedCategoryId);
                getAddedSubcategories(selectedCategoryId);
            } else {
                console.error('Erro ao criar subcategoria. Mensagem do servidor:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao criar subcategoria', error);
        }
    };

    const getAddedSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/admin/subcategories?category=${categoryId}`);
            setAddedSubcategories(response.data.subcategories);
        } catch (error) {
            console.error('Erro ao obter subcategorias adicionadas', error);
        }
    };

    const addCategory = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/admin/category/new', {
                name: newCategory,
            });

            if (response.data.success) {
                setNewCategory('');
                getCategories();
            } else {
                console.error('Erro ao criar categoria. Mensagem do servidor:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao criar categoria', error);
        }
    };

    const addSubcategory = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/admin/subcategories/new', {
                name: newSubcategory,
            });

            if (response.data.success) {
                setNewSubcategory('');
                getSubcategories(selectedCategoryId);
                getAddedSubcategories(selectedCategoryId);
            } else {
                console.error('Erro ao criar subcategoria. Mensagem do servidor:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao criar subcategoria', error);
        }
    };

   

    const handleDeleteCategory = async (category) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/categories/${category._id}`);

            if (response.data.success) {
                console.log('Categoria excluída com sucesso');
                getCategories();
            } else {
                console.error('Erro ao excluir categoria. Mensagem do servidor:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao excluir categoria', error);
        }
    };



    const handleDeleteSubcategory = async (sub) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/subcategories/${sub._id}`);

            if (response.data.success) {
                console.log('Subcategoria excluída com sucesso');
                getSubcategories(selectedCategoryId);
                getAddedSubcategories(selectedCategoryId);
            } else {
                console.error('Erro ao excluir subcategoria. Mensagem do servidor:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao excluir subcategoria', error);
        }
    };
  






const editCategory = async (category) => {
  try {
      const response = await axios.put(`http://localhost:3001/api/admin/categories/${category._id}`, {
          name: editCategoryName,
      });

      if (response.data.success) {
          console.log('Categoria editada com sucesso');
          setEditingItem(null); // Limpar o estado de edição
          setEditCategoryName(''); // Limpar o estado de edição do nome da categoria
          getCategories();
      } else {
          console.error('Erro ao editar categoria. Mensagem do servidor:', response.data.error);
      }
  } catch (error) {
      console.error('Erro ao editar categoria', error);
  }
};

const editSubcategory = async (sub) => {
  try {
      const response = await axios.put(`http://localhost:3001/api/admin/subcategories/${sub._id}`, {
          name: editSubcategoryName,
      });

      if (response.data.success) {
          console.log('Subcategoria editada com sucesso');
          setEditingItem(null); // Limpar o estado de edição
          setEditSubcategoryName(''); // Limpar o estado de edição do nome da subcategoria
          getSubcategories(selectedCategoryId);
          getAddedSubcategories(selectedCategoryId);
      } else {
          console.error('Erro ao editar subcategoria. Mensagem do servidor:', response.data.error);
      }
  } catch (error) {
      console.error('Erro ao editar subcategoria', error);
  }
};


    return (
        <div>
            {/* Dropdown para selecionar uma Categoria */}
            <label>
                Selecione uma Categoria:
                <select value={selectedCategoryId} onChange={(e) => getSubcategories(e.target.value)}>
                    <option value={null}>Selecione uma Categoria</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </label>

            {/* Adicionar Subcategoria à Categoria Selecionada */}
            {selectedCategoryId && (
                <div>
                    {/* Dropdown para selecionar subcategoria a adicionar */}
                    <label>
                        Selecione uma Subcategoria:
                        <select value={newSubcategory} onChange={(e) => setNewSubcategory(e.target.value)}>
                            <option value={''}>Selecione uma Subcategoria</option>
                            {availableSubcategories.map((sub) => (
                                <option key={sub._id} value={sub.name}>{sub.name}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={addSubcategoryToCategory}>Adicionar Subcategoria</button>
                </div>
            )}

            {/* Tabela para Subcategorias Adicionadas à Categoria Selecionada */}
            <table className="category-table">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Subcategoria Adicionada</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>

            <div>
                <label>
                    Adicionar Nova Categoria:
                    <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <button onClick={addCategory}>Adicionar Categoria</button>
                </label>
            </div>
{/* Tabela para Todas Categorias */}
<table className="category-table">
    <thead>
        <tr>
            <th>Todas Categorias</th>
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
        editingItem === category._id ? editCategoryName : category.name
    }
    onChange={(e) => setEditCategoryName(e.target.value)}
/>

                            <button onClick={() => editCategory(category)}>Salvar</button>
                        </>
                    ) : (
                        // Se não estiver editando, exibe o nome normal
                        category.name
                    )}
                </td>
                <td>
                    {editingItem !== category._id ? (
                        // Apenas exibe os botões de ação se não estiver editando
                        <>
                            <button onClick={() => setEditingItem(category._id)}>Editar</button>
                            <button onClick={() => handleDeleteCategory(category)}>Excluir</button>
                        </>
                    ) : (
                        // Se estiver editando, não exibe botões de ação
                        null
                    )}
                </td>
            </tr>
        ))}
    </tbody>
</table>

            <div>
                <label>
                    Adicionar Nova Subcategoria:
                    <input type="text" value={newSubcategory} onChange={(e) => setNewSubcategory(e.target.value)} />
                    <button onClick={addSubcategory}>Adicionar Subcategoria</button>
                </label>
            </div>
            {/* Tabela para Todas Subcategorias */}
            {/* Tabela para Todas Subcategorias */}
<table className="category-table">
    <thead>
        <tr>
            <th>Todas Subcategorias</th>
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
                            <button onClick={() => editSubcategory(sub)}>Salvar</button>
                        </>
                    ) : (
                        // Se não estiver editando, exibe o nome normal
                        sub.name
                    )}
                </td>
                <td>
                    {editingItem !== sub._id ? (
                        // Apenas exibe os botões de ação se não estiver editando
                        <>
                            <button onClick={() => setEditingItem(sub._id)}>Editar</button>
                            <button onClick={() => handleDeleteSubcategory(sub)}>Excluir</button>
                        </>
                    ) : (
                        // Se estiver editando, não exibe botões de ação
                        null
                    )}
                </td>
            </tr>
        ))}
    </tbody>
</table>


        </div>
    );
};

export default Categories;
