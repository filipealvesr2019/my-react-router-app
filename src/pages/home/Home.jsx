import About from "../../components/About/About"
import './Home.css'
import {Sidebar} from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topBar/Topbar"

export const Home = () => {
  return (
    <>
    <Topbar></Topbar>
    <div className="containerHome">
    
    <div>
      <Sidebar></Sidebar>
    </div>
    <About></About>

  </div>
  </>
  )
}
