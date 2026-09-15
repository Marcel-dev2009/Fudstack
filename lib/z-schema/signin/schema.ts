"use server";
import {z} from "zod";
export const signInSchema = z.object({
  email: z.email('Enter a valid email address'),
  password : z.string().min(8 , 'Password field must be more than 8 characters!'),       
})
export type LoginInput = z.infer<typeof signInSchema> 