import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Admin.css";

const AdminMenu = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="admin-menu">
      <button onClick={handleButtonClick}>Adicionar Usuário</button>
      {showForm && <UserForm closeForm={() => setShowForm(false)} />}
    </div>
  );
};

const UserForm = ({ closeForm }) => {
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
      if (role === 'admin' || role === 'employee') {
        toast.success('Usuário criado com sucesso!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light"
        });
        setTimeout(() => {
          closeForm(); // Fechar o formulário após o sucesso
        }, 4000);
      }
    } catch (error) {
      console.error('Erro ao criar usuário', error);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
    </div>
  );
};

export default AdminMenu;
