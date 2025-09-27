import { z } from "zod";

const nameRegex = /^[\p{L} ]+$/u; 
const phoneRegex = /^\+?\d{9,13}$/;


export const editSchema = z
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
    return v.startsWith("data:image/png") || v.startsWith("data:image/jpeg");
  }, { message: "Only PNG or JPEG images are allowed" }),



    phone: z
      .string()
      .trim()
      .regex(phoneRegex, { message: "ტელეფონი უნდა იყოს 9–13 ციფრი (შესაძლებელია + წინაშე)" }),

  
  })

export type EditType = z.infer<typeof editSchema>;
