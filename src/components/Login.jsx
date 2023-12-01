// Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminPage from '../AdminPage';
import EmployeePage from '../EmployeePage';
import LogoutIcon from '@mui/icons-material/Logout';
import './Login.css';

const Login = () => {
  const { loggedIn, isAdmin, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(email, password);
  };

  if (loggedIn) {
    return (
      <div className='logout-container'>
        {isAdmin ? <AdminPage /> : <EmployeePage />}
        <div className='button' onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      </div>
    );
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
