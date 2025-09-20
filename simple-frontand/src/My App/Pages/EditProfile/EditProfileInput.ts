
import type { inputeType } from '../../components/interface/interface'

const EditProfileInput:inputeType[] = [

  {label: "Image",name:"image", placeholder: " your image", type: "text"},
  {label: "Name", name :  "firstName", placeholder: "Your Name", type: "text"},
  {label: "lastName",name:"lastName", placeholder: " your Last Name", type: "text"},
  {label: "Phone",name:"phone", placeholder: " your Phone", type: "tel"},
  
]

export default EditProfileInput