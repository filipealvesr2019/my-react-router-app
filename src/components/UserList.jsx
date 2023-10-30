import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/UserList.css';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/login');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((login, index) => (
        <div key={index}>
          <p><strong>Role:</strong> {login.role} | <strong>Email:</strong> {login.email} | <strong>Password:</strong> {login.password} </p>
          <EditIcon></EditIcon>
          <DeleteIcon></DeleteIcon>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UserList;
