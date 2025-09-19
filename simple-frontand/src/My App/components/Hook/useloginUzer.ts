import { useMutation } from "@tanstack/react-query"
import LoginUzer from "../../../App servise/ReactQuery/mutation/LoginUzer"
import type { validationType } from "../interface/interface"
import { userstate } from "../../../zustand/Uzerstate"


const useloginUzer = () => {
    
    const {setState} = userstate()

const result = useMutation({
    mutationFn: (logindata: validationType) => LoginUzer(logindata),
    onError:(error) => console.log(error),
    onSuccess:(data) => {
        console.log("Success")
        setState(data.user)
    
    }
    
})
return result
  
}

export default useloginUzer