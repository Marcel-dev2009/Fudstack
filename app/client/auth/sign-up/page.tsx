import SignUpClient from "@/app/components/client-components/sign-up-client"
import { auth, prisma } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
async function SignUpClientPage() {
  const session = await auth.api.getSession({
    headers:await headers()
  })
  if(!session){
    return(
   <section>
     <SignUpClient/>     
   </section>
    )

  }
  const user = await prisma.user.findUnique({
    where:{
      id:session.user.id
    },
    select:{
      role:true
    }
  });
 if (user?.role === "AGENT"){
  redirect("/agent/dashboard");
  }else if(user?.role === "CLIENT"){
          redirect("/client/dashboard")
    }
}
export default SignUpClientPage