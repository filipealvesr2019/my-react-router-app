import React from "react";
import UserList from "../../components/UserList";
import "./Admin.css";
import AdminMenu from "../../components/AdminMenu";
import {Sidebar} from "../../components/sidebar/Sidebar"

export default function Admin() {

  return (
    <div className="AdminContainer">
           <div className="sidebar">  
           <Sidebar/>

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
