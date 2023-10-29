import AdminMenu from "./components/AdminMenu";
import ButtonClose from "./components/ButtonClose";
import UserList from './components/UserList';

const AdminPage = () => {
    // Sua lógica para a página do administrador aqui
    return (
      <>
      <AdminMenu></AdminMenu>
      <ButtonClose></ButtonClose> 
      <div className="table">
      <div className="h1">
        <h1>fubção</h1>
        <h1>nome</h1>
        <h1>email</h1>
        <h1>senha</h1>
      </div>
      <div className="list">
       <UserList></UserList>
      </div>

    </div>
      </>
    )
  };
  
  export default AdminPage;