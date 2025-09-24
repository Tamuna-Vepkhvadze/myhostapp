import type { validationType } from "../../../My App/components/interface/interface"
import { MyAxiosWrapper } from "../../axsios/MyAxiosWrapper"



const LoginUzer = async(logindata: validationType) => {

    const result = await MyAxiosWrapper.post("/api/login",logindata )
    return result.data
 
}

export default LoginUzer