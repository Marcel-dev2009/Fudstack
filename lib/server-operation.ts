"use server";
import {prisma } from "./auth";
import { updateTag } from "next/cache";
import { CachedRestaurantList } from "./cache/getRestaurant";
import { getOrganization } from "./actions/getOrganization";
import { getUserSession } from "./actions/getSession";
export const updateUserRoleForAgent =  async () => {
 const session = await getUserSession();
 if(!session) return;
 await prisma.user.update({
   where:{
    id:session.user.id
   },
   data:{
    role:"AGENT", 
    emailVerified:true     
   }       
 })
} 
export const updateUserRoleForClient =  async (userId:string) => {
 if(!userId) return;
 await prisma.user.update({
   where:{
    id:userId      
   },
   data:{
    role:"CLIENT", 
    emailVerified:true,     
   }       
 })
} 
export const CheckUserRole = async (userId:string) => {
  if(!userId) return;
  await prisma.user.findUnique({
   where:{
    id:userId
   },
   select:{
    role: true,
   }
  })
}
export const completeOnboarding = async (userId:string) => {
if(!userId) return;
await prisma.user.update({
  where:{
    id:userId
  },
  data:{
    onboardingCompleted:true
  }
});
}





 export async function getRestaurants(){
  const session = await getUserSession();
  if(!session) return null;
  const organization = await getOrganization(session.user.id);
  if(!organization) return null;
   return await CachedRestaurantList(organization.id);
 }


 
export async function createRestaurant( name:string, logoUrl:string, phone:string, email:string, staffNos:number){  
    const session = await getUserSession();
  if(!session) return null;
    const organization = await getOrganization(session.user.id);
    if(!organization) return null;
   await prisma.restaurant.create({
    data:{
    name,
    logoUrl,
    phone,
    email,
    staffNos,
    organizationId:organization.id
    }
  });
   updateTag(`organization-restaurant:${organization.id}`);
}




