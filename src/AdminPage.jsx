import AdminMenu from "./components/AdminMenu";
import ButtonClose from "./components/ButtonClose";
import UserList from './components/UserList';
import "./AdminPage.css"
const AdminPage = () => {
    // Sua lógica para a página do administrador aqui
    return (
      <>
      <AdminMenu></AdminMenu>
      <div className="table">
      <div className="h1">
        <h1>Cadastro de Usuarios</h1>
      </div>
      <div className="list">
       <UserList></UserList>
      </div>

    </div>
    <ButtonClose></ButtonClose> 

      </>
    )
  };
  
  export default AdminPage;