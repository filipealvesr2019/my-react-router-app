import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminMenu.css';



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
  const [name, setName] = useState('');
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
      if (role === 'administrador' || role === 'funcionario') {
        // Armazenar informações no localStorage
        
        localStorage.setItem('name', name);

        toast.success('Usuário criado com sucesso!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: 'light',
        });
        setTimeout(() => {
          closeForm(); // Fechar o formulário após o sucesso
        }, 4000);
      }
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      toast.error('Erro ao criar usuário', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'light',
      });
    }
  };

  return (
    <>
    <div className="modal" onClick={closeForm}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeForm}>
          &times;
        </span>
        <div className="modal-form" >
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
              <option value="administrador">Administrador</option>
              <option value="funcionario">Funcionário</option>
            </select>
            <button type="submit">Adicionar</button>
          </form>
        </div>
      </div>
    </div>
  
    </>
  );
};

export default AdminMenu;
