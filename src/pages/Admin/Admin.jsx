import React from 'react';
import UserList from "../../components/UserList";
import "./Admin.css";
import AdminMenu from "../../components/AdminMenu";
import { Sidebar } from "../../components/sidebar/Sidebar";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/atom';


export default function Admin() {
  const auth = useAuth();

  // Agora você pode acessar as propriedades e métodos do contexto de autenticação
  console.log('loggedIn:', auth.loggedIn);
  console.log('isAdmin:', auth.isAdmin);

  // Exemplo de uso para logout
  const handleLogout = () => {
    auth.logout();
  }

  return (
    <div className="AdminContainer">
      <div className="sidebar">  
        <Sidebar />
        <div className='button'onClick={handleLogout}>
          <LogoutIcon />
          <span> Sair</span>
        </div>
      </div>
      <div className="cadastro">
        <AdminMenu className='AdminMenu'></AdminMenu>
        <div className="table"/>
        <div className="h1">
          <h1>Cadastro de Usuarios</h1>
        </div>
        <div className="list">
          <UserList></UserList>
        </div>
      </div>


    </div>
  );
}
