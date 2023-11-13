import AdminMenu from "./components/AdminMenu";
import UserList from './components/UserList';
import styles from "./AdminPage.module.css"
import Topbar from "./components/Topbar/Topbar"
const AdminPage = () => {
    // Sua lógica para a página do administrador aqui
    return (
      <>
      <Topbar></Topbar>
      <AdminMenu></AdminMenu>
      <div className={styles.table}>
      <div className={styles.h1}>
        <h1>Cadastro de Usuarios</h1>
      </div>
      <div className={styles.list}>
       <UserList></UserList>
      </div>

    </div>

      </>
    )
  };
  
  export default AdminPage;