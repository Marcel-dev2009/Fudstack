import { Metadata } from "next";
import Parent from "./components/general/parent";
import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { brand } from "@/brand";
export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
};
export default async function Home() {
  const session = await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
      return (
   <section className="overflow-x-hidden overflow-y-auto">
   <Parent/>
    </section> 
  );
  }
  const user = await prisma.user.findUnique({
    where:{
      id:session.user.id,
    },
    select:{
      role : true
    }
  });
  if(user?.role === "CLIENT"){
    redirect("/client/dashboard")
  } else if(user?.role === "AGENT"){
    redirect("/agent/dashboard")
  }
}
