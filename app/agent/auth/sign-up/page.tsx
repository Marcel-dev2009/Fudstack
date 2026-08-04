import SignUpAgent from "@/app/components/agent-components/sign-up-agent"
import { auth, prisma } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
 async function SignUpPageForAgent() {
/* 
when a user comes to our auth page
if they have a session and onboarding is true redirect to dashboard
else if they have a session but onboarding is false redirect to onboarding 
else if they have no session and no onboarding then return the signup compoenent 

if user has a session as a client redirect them to client else send them to signup 
*/
const session = await auth.api.getSession({
  headers: await headers()
})
if(!session){
 return(
    <SignUpAgent/>
  )
};
   const user = await prisma.user.findUnique({
    where:{
      id:session.user.id
    },
    select:{
      role:true,
      onboardingCompleted:true,
    }
   });
   if(user?.onboardingCompleted === false){
    redirect("/agent/onboarding")
   } else if(user?.onboardingCompleted === true){
    redirect("/agent/dashboard")
   };
   if(user?.role === "CLIENT"){
    redirect("/client/auth/sign-in")
   } else{
    redirect("/agent/dashboard")
   }
}
export default SignUpPageForAgent