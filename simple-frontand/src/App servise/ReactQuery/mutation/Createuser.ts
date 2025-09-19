import type { registUzerType } from "../../../My App/components/interface/interface"
import { MyAxiosWrapper } from "../../axsios/MyAxiosWrapper"



const Createuser = async (data:registUzerType) => {
    const result = await MyAxiosWrapper.post("/api/register",data)
    return result.data
  
}

export default Createuser