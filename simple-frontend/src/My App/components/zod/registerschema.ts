import { z } from "zod";

const nameRegex = /^[\p{L} ]+$/u; 
const phoneRegex = /^\+?\d{9,13}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const simpleUrlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: "სახელი უნდა შეიცავდეს მინიმუმ 2 ასოს" })
      .regex(nameRegex, { message: "სახელი შეიძლება შეიცავდეს მხოლოდ ასოებს და სივრცეებს" }),

    lastName: z
      .string()
      .trim()
      .min(2, { message: "გვარი უნდა შეიცავდეს მინიმუმ 2 ასოს" })
      .regex(nameRegex, { message: "გვარი შეიძლება შეიცავდეს მხოლოდ ასოებს და სივრცეებს" }),

    image: z
      .string()
      .optional()
      .nullable()
      .refine((v) => {
        if (!v) return true;
        return simpleUrlRegex.test(v);
      }, { message: "Invalid image URL" }),

    phone: z
      .string()
      .trim()
      .regex(phoneRegex, { message: "ტელეფონი უნდა იყოს 9–13 ციფრი (შესაძლებელია + წინაშე)" }),

    email: z
      .string()
      .trim()
      .email({ message: "არასწორი იმეილის ფორმატი" }),
    
    password: z
      .string()
      .min(6, { message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო" })
      .regex(passwordRegex, { message: "პაროლი უნდა შეიცავდეს მინიმუმ 1 დიდ ასოს და 1 ციფრს" }),

    confirmPassword: z.string(),
  })
  .superRefine((obj, ctx) => {
    if (obj.password !== obj.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "პასვორდი და კონფირმა პასვორდი არ ემთხვევა ერთმანეთს",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterInput = z.infer<typeof registerSchema>;
