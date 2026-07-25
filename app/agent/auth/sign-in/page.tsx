import LoginAgent from "@/app/components/agent-components/login"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
async function SignInAgentPage() {
  const session = await auth.api.getSession({
   headers:await headers(), 
  })
  if(session){
    redirect("/agent/dashboard")
  }
  return <LoginAgent/>
}
export default SignInAgentPage