import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/UserList.css';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <table>
    <thead>
      <tr>
        <th>Credencial</th>
        <th>Email</th>
        <th>Senha</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id} className={user.role.toLowerCase()}>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
            <EditIcon className='edit'></EditIcon>
            <DeleteIcon className='delete' onClick={() => handleDelete(user._id)}></DeleteIcon>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default UserList;
