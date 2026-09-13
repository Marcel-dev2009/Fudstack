"use server";
import { cacheTag } from "next/cache";
import { prisma } from "../auth";
export async function getOrganization(userId:string) {
  "use cache";
  cacheTag(`organization-data-tag`);
  const organization = await prisma.organization.findFirst({
   where:{
    ownerId:userId,   
   },
   select:{
   id:true,
   ownerId:true,
   name:true,
   logoUrl:true,
   description:true
  },
  // take: 2,
  });
   return organization;      
}