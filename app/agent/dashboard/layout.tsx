import SideBar from "@/app/components/agent-components/sidebar";
import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
async function DashboardLayout({children}:{
    children:React.ReactNode      
}) {    
   const session = await auth.api.getSession({
     headers: await headers()
   });
    if (!session?.user.id) return;
  
   const createdOrganization = await prisma.organization.findFirst({
   where:{
     ownerId:session.user.id,
   },
   select:{
    name:true,
    description:true,
    logoUrl:true,
   }
  });
  
 if(!createdOrganization) redirect("/agent/onboarding");    

  return (
     <main className="flex min-h-screen w-full overflow-hidden bg-white">
       <SideBar organizationName={createdOrganization.name} tagline={createdOrganization.description}
       className="w-56 shrink-0"/>
     {children}
     </main>
  )
}
export default DashboardLayout