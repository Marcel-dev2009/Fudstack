"use client";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Plus,
  Store,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const SkeletonLoader = dynamic(() => import("../../../components/ui/skeleton-loader"))
type Restaurant = {
   id:string
   name:string,
    logoUrl:string,
    phone:string,
    email:string,
    staffNos:number,
    status:string,
    resNos:number
}
function RestaurantManager() {
  // const router = useRouter();
  const [restaurantData , setRestaurantData] = useState<Restaurant[]>([]);
  const [loading , setLoading] = useState<boolean>(true);
  const [error , setError] = useState<string| undefined>(undefined)
  useEffect(() => {
  async function getRestaurants(){
    try{
    const res = await fetch("/api/restaurants"); 
    const data:Restaurant[] = await res.json();
     if(!res.ok){
    setError("Failed to fetch Restaurant data");
    return;
   } else{
      console.log(data);
     setRestaurantData(data);
   }
    } catch(error){
     setError(`Unauthorized access:${
      error instanceof Error ? error.message : "No restaurant data found!"
     }`);
     
    }finally{
      setLoading(false);
    }
  }
  getRestaurants();
 },[])
  const activeRestaurants = restaurantData.filter(
    (restaurant) => restaurant.status === "ACTIVE"
  ).length;

  const totalStaff = restaurantData.reduce(
    (total, restaurant) => total + restaurant.staffNos,
    0
  );

  return (
    <main className="w-full bg-white text-slate-900"> {/*   */}{/* min-h-screen  */}
      {/* Page header */}
      <section className="border-b border-black/5">
        <div className="w-full px-5 py-6 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                <Building2 size={13} />
                <span>Organization</span>
                <ChevronRight size={11} />
                <span>Restaurants</span>
              </div>

              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Restaurants
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Manage the restaurants created under your organization.
              </p>
            </div>

            <button
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl bg-brand-burn px-4 py-2.5
                text-xs font-semibold text-white
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-md
                active:translate-y-0
              "
            >
              <Plus size={16} />
              New restaurant
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="w-full px-5 py-6 sm:px-7 lg:px-9">
        {/* Overview cards */}
        <div
          className="
            grid w-full
            grid-cols-1 gap-4
            md:grid-cols-3
          "
        >
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
              {loading
                ?  (
                  <>
                 <div className="flex flex-col w-full gap-2">
                   <SkeletonLoader className="bg-black/10 w-10 rounded-sm h-4"/> 
                  <SkeletonLoader className="bg-black/10 w-20 rounded-sm h-4"/>
                 </div>
                  </>
                )
                : error
                  ? error
                  : restaurantData.length}
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
                {loading
                  ? (
                     <>
                 <div className="flex flex-col w-full gap-2">
                   <SkeletonLoader className="bg-black/10 w-10 rounded-sm h-4"/> 
                  <SkeletonLoader className="bg-black/10 w-20 rounded-sm h-4"/>
                 </div>
                  </>
                  )
                  : error
                    ? error
                    : activeRestaurants}
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
                  {loading
                    ?  (
                       <>
                 <div className="flex flex-col w-full gap-2">
                   <SkeletonLoader className="bg-black/10 w-10 rounded-sm h-4"/> 
                  <SkeletonLoader className="bg-black/10 w-20 rounded-sm h-4"/>
                 </div>
                  </>
                    )
                    : error
                      ? error
                      : totalStaff}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant section */}
        <div className="mt-8 w-full">
          {/* Section heading */}
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-sm font-semibold">
                Your restaurants
              </h2>

              <p className="mt-1 text-[11px] text-slate-400">
                Restaurants managed by this organization
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-500">
                {loading ? (<SkeletonLoader className="w-2 h-2 rounded-full"/>) : error ?`${error}` : `${restaurantData.length}`} location/s 
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RestaurantManager;