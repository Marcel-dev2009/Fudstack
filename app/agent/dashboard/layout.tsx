import SideBar from "@/app/components/agent-components/sidebar";
import { getOrganization } from "@/lib/actions/getOrganization";
import { redirect } from "next/navigation";
async function DashboardLayout({children}:{
    children:React.ReactNode      
}) {    
   const createdOrganization = await getOrganization()
  
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