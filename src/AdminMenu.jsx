// AdminMenu.jsx
import React, { useState } from 'react';
import axios from 'axios';
import "./Admin.css"
const AdminMenu = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="admin-menu">
      <button onClick={handleButtonClick}>Adicionar Usuário</button>
      {showForm && <UserForm />}
    </div>
  );
};

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user', {
        email: email,
        password: password,
        role: role,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao criar usuário', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="user-form">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="role">Função</label>
      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="">Selecione a função</option>
        <option value="admin">Administrador</option>
        <option value="employee">Funcionário</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AdminMenu;
