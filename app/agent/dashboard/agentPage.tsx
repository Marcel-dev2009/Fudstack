import AgentDashboardHero from "@/app/components/agent-components/dashboard-hero";
import { getOrganization } from "@/lib/actions/getOrganization";

async function AgentPage() {
  const organization = await getOrganization();
  if (!organization) return null;

  return (
    <main className="min-h-screen w-full bg-white pt-16 lg:pt-0 lg:pl-64 transition-all duration-300">
      <section className="w-full min-w-0">
        <AgentDashboardHero 
          organizationName={organization.name} 
          organizationPhoto={organization.logoUrl}
        />
      </section>
    </main>
  );
}

export default AgentPage;