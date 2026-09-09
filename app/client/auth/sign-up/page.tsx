import SignUpClient from "@/app/components/client-components/sign-up-client"
import { auth, prisma } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { getUser } from "@/lib/actions/getUser"
import { getUserSession } from "@/lib/actions/getSession"
async function SignUpClientPage() {
  const session = await getUserSession();
  if(!session){
    return(
   <section>
     <SignUpClient/>     
   </section>
    )

  }
  const user = await getUser(session.user.id);
 if (user?.role === "AGENT"){
  redirect("/agent/dashboard");
  }else if(user?.role === "CLIENT"){
          redirect("/client/dashboard")
    }
}
export default SignUpClientPage