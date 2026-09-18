"use server";
// import { cacheTag } from "next/cache";
import { prisma } from "../auth"
export async function getLocation(organizationId:string){        
/*  "use cache";
 cacheTag(`restaurant-location:${organizationId}`); */
 const restaurant = await prisma.restaurant.findUnique({
  where:{
    id:organizationId
  },        
  select:{
    id:true,      
    locations:true
  }
 })
 if(!restaurant) return null;
 return await prisma.location.findUnique({
   where:{
    id:restaurant.id
   },
   select:{
    city:true,
    state:true,
    address:true,      
   }       
 })         
}