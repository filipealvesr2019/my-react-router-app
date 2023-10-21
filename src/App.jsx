import React, { useState, useEffect } from 'react';
import './App.css';
const fakeDatabase = {
  admin: { email: 'admin@example.com', password: 'admin' },
  funcionarios: []
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  
  useEffect(() => {
    const funcionariosData = JSON.parse(localStorage.getItem('funcionarios'));
    if (funcionariosData) {
      setFuncionarios(funcionariosData);
    }
  }, []);

  // Atualizar o localStorage sempre que o estado de funcionarios for alterado
  useEffect(() => {
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
  }, [funcionarios]);
  const handleLogin = () => {
    if (email === fakeDatabase.admin.email && password === fakeDatabase.admin.password) {
      setLoggedIn(true);
      setIsAdmin(true);
    } else {
      const funcionario = fakeDatabase.funcionarios.find(
        (funcionario) => funcionario.email === email && funcionario.password === password
      );

      if (funcionario) {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }
    }
  };

  const handleAddFuncionario = (email, password) => {
    const newFuncionario = { email, password };
    setFuncionarios([...funcionarios, newFuncionario]);
  };

  const handleExcluirFuncionario = (index) => {
    const updatedFuncionarios = funcionarios.filter((_, i) => i !== index);
    setFuncionarios(updatedFuncionarios);
  };

  if (loggedIn) {
    if (isAdmin) {
      return (
        <AdminPage
          funcionarios={funcionarios}
          handleAddFuncionario={handleAddFuncionario}
          handleExcluirFuncionario={handleExcluirFuncionario}
        />
      );
    } else {
      return <FuncionarioPage />;
    }
  }

  return (
    <div className="flex">
    <div className='login'>
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
      <button className='button' onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

const AdminPage = ({ funcionarios, handleAddFuncionario, handleExcluirFuncionario }) => {
  const [novoEmail, setNovoEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const adicionarFuncionario = () => {
    handleAddFuncionario(novoEmail, novaSenha);
    setNovoEmail('');
    setNovaSenha('');
  };

  return (
    <div>
      <h2>Página do Admin</h2>
      <div>
        <input
          type="text"
          placeholder="Email do novo Funcionário"
          value={novoEmail}
          onChange={(e) => setNovoEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha do novo Funcionário"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <button onClick={adicionarFuncionario}>Adicionar Funcionário</button>
      </div>
      <ul>
        {funcionarios.map((funcionario, index) => (
          <li key={index}>
            {funcionario.email}{' '}
            <button onClick={() => handleExcluirFuncionario(index)}>Excluir</button>
          </li>
        ))}
      </ul>
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
