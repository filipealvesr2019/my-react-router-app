import About from "../../components/About/About"
import './Home.css'
import {Sidebar} from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topBar/Topbar"

export const Home = () => {
  return (
    <div>
    <Topbar></Topbar>
    <div className="container">
      <Sidebar></Sidebar>
    </div>
  </div>
  )
}
