import { auth, prisma } from "@/lib/auth"
import AgentPage from "./agentPage"
import { headers } from "next/headers"
async function AgentDashboardPage() {
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
   logoUrl:true,
  }
 });
 
 if(!createdOrganization) throw new Error("Oops, No Organization found");
  return (
   <AgentPage  organizationName={createdOrganization?.name} organizationPhoto={createdOrganization.logoUrl}/>
  )
}
export default AgentDashboardPage