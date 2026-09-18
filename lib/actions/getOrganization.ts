"use server";
import { cacheTag } from "next/cache";
import { prisma } from "../auth";
export async function getOrganization(userId:string) {
  "use cache";
  cacheTag(`organization-data-tag`);
  const organization = await prisma.organization.findUnique({
   where:{
    ownerId:userId,   
   },
   select:{
   id:true,
   ownerId:true,
   resNos:true,
   name:true,
   logoUrl:true,
   description:true
  },
  // take: 2,
  });
   return organization;      
}