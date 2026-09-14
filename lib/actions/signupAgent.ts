"use server";
import z from "zod";
import { auth } from "../auth";
import { signUpSchema , signUpInput} from "../z-schema/signup/schema";
export type ActionResponse = {
 success: boolean,
 message:string,
 errors?:{
  name?:string[],
  email?:string[],
  password?:string[]
 },
 data?: signUpInput,
}
export const signUp = async (data:signUpInput):Promise<ActionResponse> => {
 const validatedInput = signUpSchema.safeParse(data);

 if(!validatedInput.success){
   const {fieldErrors} = z.flattenError(validatedInput.error)
  return{
    success:false,
    message: "Validation Error",
    errors:fieldErrors
  }
}
 const {name , email , password} = validatedInput.data; 
  await auth.api.signUpEmail({
  body:{
    email,
    password,
    name,       
  }        
 });
 return{
  success:true,
  message:"Signup Succesfull!",
  data
 };
}
