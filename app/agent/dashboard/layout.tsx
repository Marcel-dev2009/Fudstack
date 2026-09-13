import SideBar from "@/app/components/agent-components/sidebar";
import { getOrganization } from "@/lib/actions/getOrganization";
import { getUserSession } from "@/lib/actions/getSession";
import { redirect } from "next/navigation";
async function DashboardLayout({children}:{
    children:React.ReactNode      
}) { 
   const session = await getUserSession();
   if(!session) return; //we'll throw new Error later   
   const createdOrganization = await getOrganization(session.user.id);
  
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