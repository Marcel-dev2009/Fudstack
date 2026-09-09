import LoginClient from "@/app/components/client-components/login"
import { getUserSession } from "@/lib/actions/getSession";
import { redirect } from "next/navigation"
async function SignInClientPage() {
  const session = await getUserSession()
  if(session){
    redirect("client/dashboard")
  } else{
      return (
    <LoginClient/>
  )
  }

}
export default SignInClientPage