import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminMenu.css';

const AdminMenu = () => {
  const [showForm, setShowForm] = useState(false);
  const [userList, setUserList] = useState([]);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="admin-menu">
      <button onClick={handleButtonClick}>Adicionar Usuário</button>
      {showForm && <UserForm closeForm={() => setShowForm(false)} setUserList={setUserList} />}
      <div className="table">
        <div className="h1">
          <h1>Função</h1>
          <h1>Nome</h1>
          <h1>Email</h1>
          <h1>Senha</h1>
        </div>
        <div className="info">
          {userList.map((user, index) => (
            <div style={{display:"flex", gap:"2rem"}} key={index}>
              <p>{user.role}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.password}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UserForm = ({ closeForm, setUserList }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user', {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      console.log(response.data);
      if (role === 'admin' || role === 'employee') {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('role', role);

        const newUser = { name: name, email: email, password: password, role: role };
        setUserList((prevList) => [...prevList, newUser]);

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
          closeForm();
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
    <div className="modal" onClick={closeForm}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeForm}>
          &times;
        </span>
        <div className="modal-form">
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
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
      </div>
    </div>
  );
};

export default AdminMenu;
