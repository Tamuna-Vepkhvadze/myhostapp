import {create} from "zustand"
import type { loginUzerType } from "../My App/components/interface/interface"


interface Userstatetype {

    globalstate:loginUzerType | null
    setState: ( user:loginUzerType) => void
    logOut: () => void
}

export const userstate =  create<Userstatetype>((set) => ({

   globalstate: null,

   setState: (uzer) => {
    set({globalstate: uzer})

    localStorage.setItem("validUzer", JSON.stringify(uzer))
    
   },



   logOut: () =>{
    set({globalstate:null})
    localStorage.removeItem("validUzer")

   }
    
}))
