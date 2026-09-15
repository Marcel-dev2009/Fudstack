"use server";
"use server";
import z from "zod";
import { auth } from "../auth";
import { signInSchema , LoginInput } from "../z-schema/signin/schema";
export type ActionResponse = {
  success: boolean,
  message:string,
  errors?:{
  email?:string[],
  password?:string[]
 },
 data?: LoginInput,
}
export const signIn = async (data:LoginInput):Promise<ActionResponse> => {
 const validatedInput = signInSchema.safeParse(data);

 if(!validatedInput.success){
   const {fieldErrors} = z.flattenError(validatedInput.error)
  return{
    success:false,
    message: "Validation Error",
    errors:fieldErrors
  }
}
 const {email , password} = validatedInput.data; 
  await auth.api.signInEmail({
  body:{
    email,
    password,
  }        
 });
 return{
  success:true,
  message:"Login Succesfull!",
  data
 };
}
