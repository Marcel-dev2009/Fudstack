"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/app/components/agent-components/dashboard-hero")
);
interface Props{
 organizationName:string
 organizationPhoto:string
}
function AgentPage({ organizationName, organizationPhoto}:Props) {
  return (
    <main className="flex min-h-screen w-full overflow-hidden bg-white">
      {/* Remaining available space */}
      <section className="min-w-0 flex-1 overflow-y-auto">
        <Dashboard organizationName={organizationName} organizationPhoto={organizationPhoto}/>
      </section>
    </main>
  );
}

export default AgentPage;