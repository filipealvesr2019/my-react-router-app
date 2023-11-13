import AdminMenu from "./components/AdminMenu";
import UserList from './components/UserList';
import styles from "./AdminPage.module.css"
import TopBar from "./components/topBar/TopBar"
const AdminPage = () => {
    // Sua lógica para a página do administrador aqui
    return (
      <>
      <TopBar></TopBar>
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