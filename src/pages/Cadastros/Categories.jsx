// Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [availableSubcategories, setAvailableSubcategories] = useState([]);

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
            loadAvailableSubcategories(categoryId);
        } catch (error) {
            console.error('Erro ao obter subcategorias', error);
        }
    };

    const loadAvailableSubcategories = async (categoryId) => {
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
            } else {
                console.error('Erro ao criar subcategoria. Mensagem do servidor:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao criar subcategoria', error);
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

            {/* Tabela para Todas Categorias e Subcategorias */}
            <table>
                <thead>
                    <tr>
                        <th>Todas Categorias</th>
                        <th>Todas Subcategorias</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                                {subcategories.map((sub) => (
                                    <div key={sub._id}>{sub.name}</div>
                                ))}
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
