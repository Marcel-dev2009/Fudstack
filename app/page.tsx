import { Metadata } from "next";
import { redirect } from "next/navigation";
import { brand } from "@/brand";
import { getUser } from "@/lib/actions/getUser";
import { getUserSession } from "@/lib/actions/getSession";
import Parent from "./components/general/parent";

export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
};

export default async function Home() {
  const session = await getUserSession();

  // 1. Unauthenticated users stay on the home landing page
  if (!session) {
    return (
      <section className="overflow-x-hidden overflow-y-auto">
        <Parent />
      </section>
    );
  }

  const user = await getUser(session.user.id);
  if(!user) return;
  if (user.role === "CLIENT") {
    redirect("/client/dashboard");
  }

  if (user.role === "AGENT") {
    redirect("/agent/dashboard");
  }

  // Fallback: If user has a session but an unhandled role
  return redirect("/unauthorized");
}
