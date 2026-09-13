"use server";
import { onboardingData } from "@/types";
import {prisma } from "./auth";
import { updateTag } from "next/cache";
import { CachedRestaurantList } from "./cache/getRestaurant";
import { getOrganization } from "./actions/getOrganization";
import { getUserSession } from "./actions/getSession";
export const updateUserRoleForAgent =  async (userId:string) => {
 if(!userId) return;
 await prisma.user.update({
   where:{
    id:userId      
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
export const handleOnboarding = async (
  userId:string,
  data:onboardingData
) => {
  await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data:{
      ...data.organization,
        ownerId:userId
      }
    });
  const restaurant = await tx.restaurant.create({
    data:{
     ...data.restaurant,
      organizationId : organization.id,
    }
   });
   await tx.location.create({
    data:{
    ...data.location,
    restaurantId :restaurant.id
    }
   })
  })
 }


 export async function getRestaurants(){
  const session = await getUserSession();
  if(!session) return;
  const organization = await getOrganization(session.user.id);
  if(!organization) return;
   return await CachedRestaurantList(organization.id);
 }
export async function createRestaurant( name:string, logoUrl:string, phone:string, email:string, staffNos:number, resNos:number){  
    const session = await getUserSession();
  if(!session) return;
    const organization = await getOrganization(session.user.id);
    if(!organization) return;
   await prisma.restaurant.create({
    data:{
    name,
    logoUrl,
    phone,
    email,
    staffNos,
    resNos,
    organizationId:organization.id
    }
  });
   updateTag(`organization-restaurant:${organization.id}`);
}