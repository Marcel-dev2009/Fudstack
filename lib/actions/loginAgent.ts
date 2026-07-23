"use server";
import { auth } from "../auth";
export const signIn = async (email:string , password:string) => {
  const result = await auth.api.signInEmail({
   body:{
   email,
   password
   }       
  });
  return result        
};