import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null); // Estado para armazenar o ID do usuário a ser excluído
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      setError('Erro ao buscar usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('Erro ao deletar usuário.');
    } finally {
      setDeleteUserId(null); // Limpa o ID do usuário a ser excluído
      setDeleteModalOpen(false); // Fecha o modal
    }
  };

  const handleDeleteIconClick = (userId) => {
    setDeleteUserId(userId);
    setDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div>
      {loading && <p>Carregando usuários...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th className="credencial">Credenciais</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className={user.role}>{user.role} </td>
                <td>{user.email}</td>
                <td>
                  <EditIcon className='edit'></EditIcon>
                  <DeleteIcon className='delete' onClick={() => handleDeleteIconClick(user._id)}></DeleteIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de confirmação */}
{isDeleteModalOpen && (
  <div>
    <div className="overlay" onClick={handleCancelDelete}></div>
    <div className="delete-modal">
      <p>Você tem certeza que deseja excluir o usuário?</p>
      <div className="buttonDeleteStyle">
      <button onClick={() => handleDelete(deleteUserId)}>Sim</button>
      <button  onClick={handleCancelDelete}>Cancelar</button>
      </div>
      
    </div>
  </div>
)}


    </div>
  );
};

export default UserList;
