import LoginClient from "@/app/components/client-components/login"
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation"
async function SignInClientPage() {
  const session = await auth.api.getSession({
  headers: await headers()
  });
  if(session){
    redirect("client/dashboard")
  } else{
      return (
    <LoginClient/>
  )
  }

}
export default SignInClientPage