import {z} from "zod";
export const signUpSchema = z.object({
  name: z.string().min(5 , 'Name field must at least be 5 characters long!'),
  email: z.email('Enter a valid email address'),
  password : z.string().min(8 , 'Password field must be more than 8 characters!'),       
})
export type signUpInput = z.infer<typeof signUpSchema> 