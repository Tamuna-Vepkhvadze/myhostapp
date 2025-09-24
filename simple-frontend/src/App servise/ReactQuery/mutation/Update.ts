
import type { EditType } from '../../../My App/components/zod/editShema'
import { MyAxiosWrapper } from '../../axsios/MyAxiosWrapper'

const Update = async (id: number, data: EditType) => {
   const result = await MyAxiosWrapper.put(`/api/users/${id}`, data)
   return result.data
  
}

export default Update