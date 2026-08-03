"use server"

import { prisma } from "../auth"

export const verifyOtp = async (email:string , code:string) => {
   const otp = await prisma.emailOtp.findFirst({
   where:{
   email,
   code,
      }    
   });
   if(!otp){
     return {
      success:false,
      message:"Invalid code "    
     }     
   }    
   if(otp.expiresAt < new Date()){
     return {
     success:false,
     message:"Code expired"
     }
   }
   return {
          success:true,
   }
}