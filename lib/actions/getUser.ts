"use server";
import { prisma } from "../auth";
export async function getUser(userId:string){
        const user = await prisma.user.findUnique({
          where:{
          id:userId
          },
          select:{
          role:true,
          onboardingCompleted:true,
          }
          }); 
      return user;
}