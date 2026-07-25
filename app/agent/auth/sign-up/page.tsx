import SignUpAgent from "@/app/components/agent-components/sign-up-agent"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
 async function SignUpPageForAgent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if(session){
    redirect("/agent/dashboard")
  }
  return <SignUpAgent/>
}
export default SignUpPageForAgent