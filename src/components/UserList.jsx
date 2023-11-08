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
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <p>
            <strong>Role:</strong> {user.role} | <strong>Email:</strong> {user.email} | <strong>Password:</strong> {user.password} <EditIcon className='edit'></EditIcon>
            <DeleteIcon className='delete' onClick={() => handleDelete(user._id)}></DeleteIcon>
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UserList;
