import { useMutation } from "@tanstack/react-query"

import { userstate } from "../../../zustand/Uzerstate"
import type { registUzerType } from "../interface/interface"
import Createuser from "../../../App servise/ReactQuery/mutation/Createuser"


const useCreateUser = () => {
  const {setState} = userstate()
    const result = useMutation({
        mutationFn: (data:registUzerType) => Createuser(data),
        onError: (error) => console.log(error),
        onSuccess: (data) => {
            console.log("succrss")
            setState(data.user)
            localStorage.setItem("token", data.token)
        }
            
    })
   return result
}

export default useCreateUser