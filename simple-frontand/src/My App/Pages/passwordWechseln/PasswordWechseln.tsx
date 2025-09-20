import { useMemo } from "react"
import RegiretForm from "../../components/Form/RegiretForm"
import type { ChangePasswordSchemaType, WechselnPasvordType } from "../../components/interface/interface"
import { passwordInputs } from "./WexselnInpute"
import { changePasswordSchema } from "../../components/zod/changePasswordSchema "
import useWechselnPassword from "../../components/Hook/useWechselnPassword"
import { useNavigate } from "react-router-dom"


const PasswordWechseln = () => {

  const {mutate, wechselnError} = useWechselnPassword()

  const navigate = useNavigate()

  const button = useMemo(() => {
    return <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">პაროლის შეცვლა</button>
  }, [])

  const action = (data:ChangePasswordSchemaType) => {
    const sendData: WechselnPasvordType = {
      newPassword: data.newPassword,
      oldPassword: data.oldPassword
    }

    mutate(sendData, {
      onSuccess: () => navigate("/SuccessPasswordChange")
    })
    console.log(sendData)


  }

  return (
    <RegiretForm action={action} button={button} inpute={passwordInputs} schema={changePasswordSchema} validError={wechselnError}/>
  )
}

export default PasswordWechseln