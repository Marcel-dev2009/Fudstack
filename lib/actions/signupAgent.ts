"use server";
import { auth } from "../auth";
export const signUp = async (email:string , password:string , name:string) => {
 const result = await auth.api.signUpEmail({
  body:{
    email,
    password,
    name,      

  }        
 });
 return result;
}
