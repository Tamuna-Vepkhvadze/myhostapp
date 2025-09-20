import { useMutation } from "@tanstack/react-query"
import LoginUzer from "../../../App servise/ReactQuery/mutation/LoginUzer"
import type { validationType } from "../interface/interface"
import { userstate } from "../../../zustand/Uzerstate"
import { useState } from "react"
import type { AxiosError } from "axios"


const useloginUzer = () => {
    
    const {setState} = userstate()

    const [errormessage, setErrormessage] = useState<string | null>(null)

const result = useMutation({
    mutationFn: (logindata: validationType) => LoginUzer(logindata),
    onError:(error: AxiosError) => {
        if(error.response?.status === 401) {
            setErrormessage("პაროლი ან ელფოსტა არასწორია")
        } else {
            setErrormessage("დაფიქსირდა შეცდომა, სცადეთ თავიდან")
        }
    },
    onSuccess:(data) => {
        console.log("Success")
        setState(data.user)
        localStorage.setItem("token", data.token)
    
    }
    
})
return {...result, errormessage}
  
}

export default useloginUzer