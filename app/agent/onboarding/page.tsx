import { redirect } from "next/navigation";
import OnboardingContainer from "./onboarding-container"
import { getUserSession } from "@/lib/actions/getSession"
async function OnboardingPage() {
 const session = await getUserSession();
 if(!session) redirect("/");
  return (
    <OnboardingContainer session={session}/>
  ) 
}
export default OnboardingPage