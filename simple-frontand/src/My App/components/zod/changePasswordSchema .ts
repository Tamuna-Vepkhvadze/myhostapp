import { z } from "zod"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: "გთხოვთ შეიყვანოთ ძველი პაროლი" }),
  newPassword: z
    .string()
    .min(6, { message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო" })
    .regex(passwordRegex, { message: "პაროლი უნდა შეიცავდეს მინიმუმ 1 დიდ ასოს და 1 ციფრს" }),
  confirmPassword: z
    .string()
    .min(1, { message: "გთხოვთ დაადასტუროთ ახალი პაროლი" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "პაროლები ერთმანეთს არ ემთხვევა",
  path: ["confirmPassword"],
})


export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>