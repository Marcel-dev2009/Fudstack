"use server";
import { cacheTag } from "next/cache"
import { prisma } from "../auth";
export async function CachedRestaurantList(organizationId:string){
   "use cache";
   cacheTag(`organization-restaurant:${organizationId}`)       
 return await prisma.restaurant.findMany({
          where:{
          organizationId:organizationId
          },
          select:{
          id:true,
          name:true,
          logoUrl:true,
          phone:true,
          email:true,
          staffNos:true,
          status:true,
          resNos:true,
          organizationId:true,
          } 
      });          
}