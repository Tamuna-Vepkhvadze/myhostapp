import {z} from "zod"

export const loginSchema = z.object({
    email:z
    .email()
    .min(1, {message:"შეიყვანეთ თქვენი ელფოსტა"}),
    password:z
    .string()
    .min(1,{ message:"შეიყვანეთ ტქვენი ფასვორდი"})
    
})

export type validationType = z.infer<typeof loginSchema>