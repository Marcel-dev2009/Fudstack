import { getOrganization } from "@/lib/actions/getOrganization"
import AgentDashboardProfile from "./agent-profile-page"
import { getRestaurants } from "@/lib/server-operation";
import { getUserSession } from "@/lib/actions/getSession";
async function AgentProfile() {
  const session = await getUserSession();
  if(!session) return; //we'll throw new Error later
 const organization = await getOrganization(session.user.id);
 const restaurant = await getRestaurants();
 if(!organization || !restaurant) return;         
  return (
    <AgentDashboardProfile organization={organization} restaurant={restaurant} organizationId={organization.id}/>
  )
}
export default AgentProfile