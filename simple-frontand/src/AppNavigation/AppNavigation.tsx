import { Route, Routes } from "react-router-dom"
import AppLeyout from "../My App/Pages/AppLeyout"
import HomePage from "../My App/Pages/Home Page/HomePage"
import LogIn from "../My App/Pages/Log In/LogIn"
import ContactPatge from "../My App/Pages/Contact Page/ContactPatge"
import Registracion from "../My App/Pages/Registration Page/Registracion"
import AboutPatge from "../My App/Pages/About/AboutPatge"
import UserProfaile from "../My App/Pages/userProfile/UserProfaile"
import Recipes from "../My App/Pages/Recipes/Recipes"
import Music from "../My App/Pages/Musuc/Music"
import BookFN from "../My App/Pages/Library Page/BoocFN"
// import BooksExplorer from "../My App/Pages/Library Page/Library "





const AppNavigation = () => {
  return (
    <Routes>
        <Route path="/" element= {<AppLeyout/>}>
            <Route index element = {<HomePage/>}/>
            <Route path="LogIn" element= {<LogIn/>}/>
            <Route path="ContactPatge" element= {<ContactPatge/>}/>
            <Route path="Registracion" element= {<Registracion/>}/>
            <Route path="AboutPatge" element= {<AboutPatge/>}/>
            <Route path="UserProfaile" element={<UserProfaile/>}/>
            <Route path = "Recipes" element={<Recipes/>}/>
            <Route path="Music" element= {<Music/>}/>
            <Route path="BookFN" element ={<BookFN/>}/>
           

        </Route> 
    </Routes>
  )
}

export default AppNavigation