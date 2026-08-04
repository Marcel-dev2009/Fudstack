import { auth } from "@/lib/auth"
import OnboardingContainer from "./onboarding-container"
import { headers } from "next/headers"
async function OnboardingPage() {
 const session = await auth.api.getSession({
  headers: await headers()
 }) 
  return (
    <OnboardingContainer session={session}/>
  ) 
}
export default OnboardingPage