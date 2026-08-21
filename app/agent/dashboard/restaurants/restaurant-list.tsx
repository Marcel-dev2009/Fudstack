import { CalendarDays,  LocateFixed, Phone, Users } from "lucide-react";
// import {useRouter} from "next/navigation";
import { getRestaurants } from "@/lib/backendOperation";
import NavigateButton from "./navigateButton";
async function RestaurantList() {
// const router = useRouter();          

const restaurantData = await getRestaurants();
 if(!restaurantData) throw new Error("No restaurant found!"); 
 return (
   <div className="mx-10">
            {restaurantData.map((restaurant) => (
                  <div
                key={restaurant.id}
                className="
                  group w-full rounded-sm
                  p-4 text-left border
                   hover:border-orange-600/50
                  transition-all duration-200
                  hover:bg-brand-burn/2.5
                  sm:p-5
                "
              >
                <div
                  className="
                    grid w-full
                    grid-cols-1 gap-4
                    lg:grid-cols-[minmax(220px,1.5fr)_minmax(160px,1fr)_minmax(120px,0.7fr)_40px]
                    lg:items-center
                    lg:gap-6
                  
                  "
                >
                  {/* Identity */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-xl bg-brand-burn
                        text-xs font-bold text-white
                        shadow-sm
                      "
                    >
                      <LocateFixed/>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-800">
                          {restaurant.name}
                        </h3>

                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
                          {restaurant.status}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-[11px] text-slate-400">
                        {restaurant.email}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Phone
                      size={14}
                      className="shrink-0 text-brand-burn"
                    />

                    <span>{restaurant.phone}</span>
                  </div>

                  {/* Staff + date */}
                  <div className="flex items-center gap-5 lg:justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Users
                        size={14}
                        className="shrink-0 text-slate-400"
                      />

                      <span>{restaurant.staffNos ?? "0"} staff</span> {/* would still find a way to use reduce method to find restaurant */}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <CalendarDays
                        size={14}
                        className="shrink-0 text-slate-400"
                      />

                      <span>{restaurant.resNos}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                <NavigateButton userId={restaurant.id}/>
                </div>
              </div>
            ))}
          </div>
 )
       
}
export default RestaurantList