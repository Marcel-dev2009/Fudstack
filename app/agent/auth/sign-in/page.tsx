import LoginAgent from "@/app/components/agent-components/login"
import { getUserSession } from "@/lib/actions/getSession"
import { redirect } from "next/navigation"
async function SignInAgentPage() {
  const session = await getUserSession();
  if(session){
    redirect("/agent/dashboard")
  } else{
    return (
     <LoginAgent/> 
    )
  }
}
export default SignInAgentPage