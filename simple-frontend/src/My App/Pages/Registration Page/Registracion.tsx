import { useMemo } from "react"
import RegiretForm from "../../components/Form/RegiretForm"
import RegistrtionInpute from "./RegistrtionInpute"
import type { registUzerType } from "../../components/interface/interface"
import useCreateUser from "../../components/Hook/useCreateUser"
import { useNavigate } from "react-router-dom"
import { registerSchema } from "../../components/zod/registerschema"


const Registracion = () => {

  const {mutate, reset} = useCreateUser()

  const navigate = useNavigate()


  const action = (formdata: registUzerType) =>{
    mutate(formdata, { onSuccess:() => {
       reset()
       navigate("/UserProfaile")

    }})
   
    
  }

  const button = useMemo(() => {
      return <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"> Registration</button>
  }, [])

  return (
    <RegiretForm action={action} button={button} inpute={RegistrtionInpute} schema={registerSchema}/>
  )
}

export default Registracion
