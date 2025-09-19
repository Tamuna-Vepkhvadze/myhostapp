import { useMemo } from "react"
import RegiretForm from "../../components/Form/RegiretForm"
import LoginImpute from "./LoginImpute"
import type { loginUzerType, validationType} from "../../components/interface/interface"
import useloginUzer from "../../components/Hook/useloginUzer"
import { useNavigate } from "react-router-dom"
import { loginSchema } from "../../components/zod/loginSchema"



const LogIn = () => {

  const {mutate, reset} =useloginUzer()
  const navigate = useNavigate()
  const action =(formdata:validationType) => {
    console.log(formdata)
    mutate(formdata, {onSuccess: () =>{
      reset()
      navigate("/UserProfaile")
    }})
    

  }

  const button = useMemo( () => {
    return <button type="submit"className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">Log In</button>
   
  },[])


  return (
    <RegiretForm action={action} button={button} inpute={LoginImpute}schema={loginSchema}/>
  )
}

export default LogIn
