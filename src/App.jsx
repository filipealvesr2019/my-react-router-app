import React, { useState } from 'react';

const fakeDatabase = {
  admin: { email: 'admin@example.com', password: 'admin' },
  funcionario: { email: 'funcionario@example.com', password: 'funcionario' }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    if (email === fakeDatabase.admin.email && password === fakeDatabase.admin.password) {
      setLoggedIn(true);
      setIsAdmin(true);
    } else if (email === fakeDatabase.funcionario.email && password === fakeDatabase.funcionario.password) {
      setLoggedIn(true);
      setIsAdmin(false);
    } else {
      alert('Credenciais inválidas');
    }
  };

  if (loggedIn) {
    if (isAdmin) {
      return <AdminPage />;
    } else {
      return <FuncionarioPage />;
    }
  }

  return (
    <div>
      <h1>Página de Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const AdminPage = () => {
  return (
    <div>
      <h2>Página do Admin</h2>
      {/* Lógica para cadastrar e excluir funcionários */}
    </div>
  );
};

const FuncionarioPage = () => {
  return (
    <div>
      <h2>Página do Funcionário</h2>
      {/* Lógica específica para funcionários */}
    </div>
  );
};

export default Login;
