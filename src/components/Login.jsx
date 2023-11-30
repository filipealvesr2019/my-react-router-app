import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
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
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });
      console.log(response)
      if (response.data.user.role === 'administrador') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else if (response.data.user.role === 'funcionario') {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }

      Cookies.set('token', response.data.user.token);
      Cookies.set('role', response.data.user.role);
    } catch (error) {
      console.error('Erro na solicitação de login', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  useEffect(() => {
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
          <label htmlFor="password">Senha</label>
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
