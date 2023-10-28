import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPage from '../AdminPage';
import EmployeePage from '../EmployeePage';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (email && password) {
      handleLogin();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });

      // Verifique a resposta do backend e defina o estado apropriado com base nela
      if (response.data.role === 'admin') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else if (response.data.role === 'employee') {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro na solicitação de login', error);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    localStorage.setItem('email', newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    localStorage.setItem('password', newPassword);
  };

  // Renderização condicional com base no estado de loggedIn e isAdmin
  if (loggedIn) {
    if (isAdmin) {
      return <AdminPage />;
    } else {
      return <EmployeePage />;
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
            onChange={handleEmailChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Digite a senha..."
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
