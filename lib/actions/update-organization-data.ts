// this would house updating functions of the restaurant page
"use server";
import { updateTag } from "next/cache";
import { prisma } from "../auth";
export async function updateOrganizationName(organizationId:string , newName:string){
 await prisma.organization.update({
  where: {
   id:organizationId,     
  },
  data:{
  name: newName,
  }
 });
 updateTag('organization-data-tag');
}

export async function updateOrganizationPhoto(organizationId:string, photoUrl:string){
  await prisma.organization.update({
  where:{
   id:organizationId       
  },
  data:{
   logoUrl:photoUrl       
  }        
  });    
   updateTag('organization-data-tag');     
}
export async function updateOrganizationDescription(organizationId:string, newDescription:string){
  await prisma.organization.update({
  where:{
   id:organizationId       
  },
  data:{
   description:newDescription,       
  }        
  });    
   updateTag('organization-data-tag');     
}