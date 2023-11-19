import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPage from '../AdminPage';
import EmployeePage from '../EmployeePage';
import LogoutIcon from '@mui/icons-material/Logout';

import './Login.css';

const Login = () => {
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(Boolean(storedToken));
  const [isAdmin, setIsAdmin] = useState(storedRole === 'adminstrador');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });

      // Verifique a resposta do backend e defina o estado apropriado com base nela
      if (response.data.role === 'administrador') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else if (response.data.role === 'funcionario') {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }

      // Armazenar token e role no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
    } catch (error) {
      console.error('Erro na solicitação de login', error);
    }
  };

  const handleLogout = () => {
    // Limpar token e role do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    // Adicionar efeito para verificar o estado de loggedIn ao carregar a página
    setLoggedIn(Boolean(storedToken));
    setIsAdmin(storedRole === 'administrador');
  }, [storedToken, storedRole]);

  // Renderização condicional com base no estado de loggedIn e isAdmin
  if (loggedIn) {
    if (isAdmin) {
      return (
        <div>
          <AdminPage />
          <div className='button' onClick={handleLogout}> <LogoutIcon ></LogoutIcon>  <span>Sair</span></div>

        </div>
      );
    } else {
      return (
        <div>
          <EmployeePage />
          <div className='buttonEmployeePage' onClick={handleLogout}> <LogoutIcon ></LogoutIcon>  <span>Sair</span></div>
          
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
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
