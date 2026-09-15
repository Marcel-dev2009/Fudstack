"use server"
import { cacheTag } from "next/cache";
import { prisma } from "@/lib/auth";
export async function getStats(organizationId:string){
 "use cache";
cacheTag(`organization-restaurant-stats:${organizationId}`)
  return await prisma.restaurant.findMany({
   where:{
    organizationId:organizationId
   },
  select:{
    id:true,
    staffNos:true,
    status:true,
   } 
 });           
}