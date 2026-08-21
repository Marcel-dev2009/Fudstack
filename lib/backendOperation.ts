"use server";
import { onboardingData } from "@/types";
import { auth, prisma } from "./auth";
import { headers } from "next/headers";

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
export const CheckOnboardingComplete = async (userId:string) => {
if(!userId) return;
await prisma.user.update({
  where:{
    id:userId
  },
  data:{
    onboardingCompleted:true
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


 export async function getRestaurants(){
     const session = await auth.api.getSession({
  headers:await headers()
 });
 if(!session?.user.id) return;
  const organization = await prisma.organization.findFirst({
    where:{
      ownerId:session.user.id // actually the user's sesssion when creating an account;
    },
    select:{
      id:true
    }
  });
  if(!organization?.id) throw new Error("Unauthorized access , No organization found");
   const restaurant = await prisma.restaurant.findMany({
    where:{
      organizationId:organization?.id
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
   return restaurant;
 }
export async function createRestaurant( name:string, logoUrl:string, phone:string, email:string, staffNos:number, resNos:number){
 const session = await auth.api.getSession({
  headers:await headers()
 });
     if(!session?.user.id) return;
    const organization = await prisma.organization.findFirst({
    where:{
      ownerId:session.user.id // actually the user's sesssion when creating an account;
    },
    select:{
      id:true
    }
  });
  if(!organization?.id) throw new Error("Unauthorized access , No organization found");
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
  })
}
