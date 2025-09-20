import { useMutation } from '@tanstack/react-query'
import Update from '../../../App servise/ReactQuery/mutation/Update'
import type { EditType } from '../interface/interface'
import { userstate } from '../../../zustand/Uzerstate'


const useEdit = (id: number) => {

    const {setState} = userstate()

  const result = useMutation({
    mutationFn: (data: EditType) => Update(id, data),
    onError: (error) => console.log(error),
    onSuccess: (data) => {
        console.log("Success")
        setState(data.user)
        

    }
  })

  return result
}

export default useEdit