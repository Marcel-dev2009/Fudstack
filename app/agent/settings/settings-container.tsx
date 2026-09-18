import { getOrganization } from "@/lib/actions/getOrganization"
import SettingsClient from "./settings-client"
import { getUserSession } from "@/lib/actions/getSession";
import { getRestaurants } from "@/lib/server-operation";
async function Settings() {
 const session = await getUserSession();
 if(!session) return null;         
 const organization = await getOrganization(session.user.id);
 if(!organization) return null;
 const restaurant = await getRestaurants();         
 if(!restaurant || restaurant.length === 0) return null;
/*  const location = await getLocation(organization.id)
 if(!location) return null; */
  return (
  <SettingsClient organization={organization} restaurant={restaurant} organizationId={organization.id}/>
  )
}
export default Settings