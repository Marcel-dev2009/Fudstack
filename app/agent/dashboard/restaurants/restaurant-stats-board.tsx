import { getOrganization } from "@/lib/actions/getOrganization";
import { getStats } from "@/lib/cache/getStats";
import { ArrowUpRight, Store, Users } from "lucide-react";

async function RestaurantStats() {         
  const organization = await getOrganization();         
  // 1. Fallback guard: Prevent crashes if the user doesn't have an active organization yet
  if (!organization) {
    return (
      <section className="w-full px-5 py-6 sm:px-7 lg:px-9 text-center text-xs text-slate-400">
        No active organization found. Create one to view statistics.
      </section>
    );
  }

  // Fetch cached analytical stats array
  const restaurantData = await getStats(organization.id) || [];   

  // 2. Safe calculation: Guard against undefined database objects
  const activeRestaurants = restaurantData.filter(
    (restaurant) => restaurant?.status === "ACTIVE"
  ).length;

  // 3. Secure array reduce math: Ensure undefined values fall back to 0 safely
  const totalStaff = restaurantData.reduce(
    (total, restaurant) => total + (restaurant?.staffNos ?? 0) ,
     0
  ); 

  return (
    <section className="w-full px-5 py-6 sm:px-7 lg:px-9">
      {/* Overview cards */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {/* Total */}
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-burn/10 text-brand-burn">
              <Store size={18} />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Total restaurants
              </p>
              <div className="mt-1 text-xl font-semibold">
                {restaurantData.length}
              </div>
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <ArrowUpRight size={18} />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Active
              </p>
              <div className="mt-1 text-xl font-semibold">
                {activeRestaurants}
              </div>
            </div>
          </div>
        </div>

        {/* Staff */}
        <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <Users size={18} />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Total staff
              </p>
              <div className="mt-1 text-xl font-semibold">
                {totalStaff}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full">
        {/* Section heading */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-sm font-semibold">Your restaurants</h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Restaurants managed by this organization
            </p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-500">
            {restaurantData.length} location{restaurantData.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RestaurantStats;
