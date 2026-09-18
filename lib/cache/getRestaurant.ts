"use server";
import { cacheLife, cacheTag } from "next/cache"
import { prisma } from "../auth";
export async function CachedRestaurantList(organizationId:string){
   "use cache";
   cacheTag(`organization-restaurant:${organizationId}`)       
   cacheLife("max");
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
          location:{
            select:{
              city:true,
              state:true,
              address:true
            }
          },
          organizationId:true,
          } 
      });          
}
export type CachedRestaurantItem = Awaited<ReturnType<typeof CachedRestaurantList>>[number]
export type AutoLocationData = CachedRestaurantItem["location"];