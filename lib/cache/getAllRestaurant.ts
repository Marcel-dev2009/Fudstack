"use server";
import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../auth";
export async function getAllRestaurant(){
  "use cache";
  cacheTag("all-restaurant-list");
  cacheLife("days");       
 return await prisma.restaurant.findMany({
  where:{
   status:"ACTIVE"       
  },
  select:{
  id:true,
  name:true,
  logoUrl:true,
  phone:true,
  email:true,
  staffNos:true,
  status:true,
  location: {
  select:{
   city:true,
   state:true,
   address:true
  }
  }
  },
  take:20
 })         
}