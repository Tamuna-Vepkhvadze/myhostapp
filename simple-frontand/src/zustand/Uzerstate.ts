import {create} from "zustand"
import {persist} from "zustand/middleware"
import type { loginUzerType } from "../My App/components/interface/interface"


interface Userstatetype {

    globalstate:loginUzerType | null
    setState: ( user:loginUzerType) => void
    logOut: () => void
}

export const userstate =  create<Userstatetype>()(
    persist(
        (set) => ({

            globalstate: null,

            setState: (user) => set({globalstate: user}),

            logOut: () => set({globalstate: null})

        }),
        {
            name: "validUzer"
        }
    )
)
