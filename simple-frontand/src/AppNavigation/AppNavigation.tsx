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
import PasswordWechseln from "../My App/Pages/passwordWechseln/PasswordWechseln"
import SuccessPasswordChange from "../My App/Pages/passwordWechseln/SuccessPasswordChange"
import EditProfile from "../My App/Pages/EditProfile/EditProfile"
import SuccessEdit from "../My App/Pages/EditProfile/SuccessEdit"
import SuccessContaqt from "../My App/Pages/Contact Page/SuccessContaqt"
import HydrationContent from "../My App/Pages/infoPage/onePage"
import WalkingContent from "../My App/Pages/infoPage/SecoundPage"
import BreathingContent from "../My App/Pages/infoPage/therdPage"
import StretchingContent from "../My App/Pages/infoPage/nextPage"
import MusicContent from "../My App/Pages/infoPage/musikPafe"
import NapContent from "../My App/Pages/infoPage/endPage"
import YogaSessiondinamic from "../My App/Pages/infoPage/dinamicBG1"
import CookingFun from "../My App/Pages/infoPage/dinamicBG2"
import ReadingHourContent from "../My App/Pages/infoPage/dinamicBG3"
import Favorites from "../My App/Pages/Recipes/Favorites"






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
            <Route path="PasswordWechseln" element={<PasswordWechseln/>}/>
            <Route path="SuccessPasswordChange" element={<SuccessPasswordChange/>} />
            <Route path="EditProfile/:id" element={<EditProfile/>} />
            <Route path="SuccessEdit" element={<SuccessEdit/>} />
            <Route path="SuccessContaqt" element={<SuccessContaqt/>} />
            <Route path="HydrationContent" element={<HydrationContent/>}/>
            <Route path="WalkingContent" element={<WalkingContent/>}/>
            <Route path="BreathingContent" element={<BreathingContent/>}/>
            <Route path="StretchingContent" element={<StretchingContent/>}/>
            <Route path="MusicContent" element={<MusicContent/>}/>
            <Route path="NapContent" element={<NapContent/>}/>
            <Route path="YogaSessiondinamic" element={<YogaSessiondinamic/>}/>
            <Route path="CookingFun" element={<CookingFun/>}/>
            <Route path="ReadingHourContent" element={<ReadingHourContent/>}/>
            <Route path="Favorites" element={<Favorites/>}/>
            


           

        </Route> 
    </Routes>
  )
}

export default AppNavigation