"use server";
type onboardingData = {
 organization:{
    name : string,
    logoUrl : string,
    description:string,
 },
  restaurant:{
      name:string,
      logoUrl:string,
      phone:string,
      email:string,
 },
 location:{
     state:string,
     country:string,
     address:string,
     city :string,
 }
}

import { prisma } from "./auth";
export const updateUserRoleForAgent =  async (userId:string) => {
 if(!userId) return;
 await prisma.user.update({
   where:{
    id:userId      
   },
   data:{
    role:"AGENT"      
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
    role:"CLIENT"      
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
//the create organization function in a nutshell submits our user data for creating an organization 