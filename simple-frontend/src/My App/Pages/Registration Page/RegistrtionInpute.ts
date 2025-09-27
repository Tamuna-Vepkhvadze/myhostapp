import type { inputeType } from "../../components/interface/interface"



const RegistrtionInpute:inputeType[] = [

  {label: "Image",name:"image", placeholder: " your image", type: "file"},
  {label: "Name", name :  "firstName", placeholder: "Your Name", type: "text"},
  {label: "lastName",name:"lastName", placeholder: " your Last Name", type: "text"},
  {label: "Email",name:"email", placeholder: " your email", type: "email"},
  {label: "Phone",name:"phone", placeholder: " your Phone", type: "tel"},
  {label: "Password",name:"password", placeholder: " your password", type: "password"},
  {label: "Confirm Password",name:"confirmPassword", placeholder: " Confirm Password", type: "password"},

]

export default RegistrtionInpute