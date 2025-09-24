import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"


const AppLeyout = () => {
  return (

    <>
        <Header/>
        <Outlet/>
    </>

  )
 
}

export default AppLeyout