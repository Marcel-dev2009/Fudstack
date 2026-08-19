"use server";

import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
export async function GET(){
 const session = await auth.api.getSession({
     headers:await headers()     
 });
 if(!session) {
    return Response.json({error:"Unauthorized access"} , {status:401});      
 }
 const organization = await prisma.organization.findFirst({
  where:{
   ownerId:session.user.id
  },
  select:{
    id:true
  }
 })
 if(!organization?.id){
  return Response.json({error:"Unauthourized access, No organization found"},{status:404})
 }
 const restaurant =  await prisma.restaurant.findMany({
   where:{
    organizationId:organization.id     
   },
  select:{
    id:true,
    name:true,
    logoUrl:true,
    phone:true,
    email:true,
    staffNos:true,
    status:true,
    resNos:true
   } 
 });     
 return Response.json(restaurant) 
   
}
