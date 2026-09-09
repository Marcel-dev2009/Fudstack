"use server";
import { prisma } from "../auth";
import { getUserSession } from "./getSession";
export async function getOrganization() {
  const session = await getUserSession();
  if(!session) return;
  const organization = await prisma.organization.findFirst({
   where:{
    ownerId:session.user.id,   
   },
   select:{
   id:true,
   name:true,
   logoUrl:true,
   description:true
  }
  });
   return organization;      
}