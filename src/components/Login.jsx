import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importe a biblioteca js-cookie
import AdminPage from '../AdminPage';
import EmployeePage from '../EmployeePage';
import LogoutIcon from '@mui/icons-material/Logout';
import './Login.css';

const Login = () => {
  const storedToken = Cookies.get('token');
  const storedRole = Cookies.get('role');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(Boolean(storedToken));
  const [isAdmin, setIsAdmin] = useState(storedRole === 'administrador');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user', {
        email: email,
        password: password
      });

      if (response.data.role === 'administrador') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else if (response.data.role === 'funcionario') {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }

      // Armazenar token e role nos cookies
      Cookies.set('token', response.data.token);
      Cookies.set('role', response.data.role);
    } catch (error) {
      console.error('Erro na solicitação de login', error);
    }
  };

  const handleLogout = () => {
    // Limpar token e role dos cookies
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    // Adicionar efeito para verificar o estado de loggedIn ao carregar a página
    setLoggedIn(Boolean(storedToken));
    setIsAdmin(storedRole === 'administrador');
  }, [storedToken, storedRole]);

  if (loggedIn) {
    if (isAdmin) {
      return (
        <div className='logout-container'>
          <AdminPage />
          <div className='button' onClick={handleLogout}>
            <LogoutIcon />
            <span>Sair</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <EmployeePage />
          <div className='buttonEmployeePage' onClick={handleLogout}>
            <LogoutIcon />
            <span>Sair</span>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="body">
      <div className="container">
        <div className='loginStyle'>
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Digite o email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Digite a senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
