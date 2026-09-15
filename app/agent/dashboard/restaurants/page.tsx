/* For the error on restaurant list I'm either going to map or just try another thing altogether  */
import RestaurantList from "./restaurant-list"
import RestaurantManager from "./restaurant-manager"
import { Suspense } from "react"
import RestaurantStats from "./restaurant-stats-board";
import SkeletonLoader from "@/app/components/ui/skeleton-loader"
  function RestuarantDashboard() {
  return (
      <main className="min-h-screen w-full bg-white pt-16 lg:pt-0 lg:pl-64 transition-all duration-300">
    <RestaurantManager serverSlot={<RestaurantStats/>}/>
    <Suspense fallback={(
      <>
      <div className="flex flex-col gap-2 ml-4">
         <SkeletonLoader className="w-[60vw] h-5 rounded-sm"/>
      <SkeletonLoader className="w-[70vw] h-5 rounded-sm"/>
      </div>
      </>
    )}>
      <RestaurantList/> 
    </Suspense> 
    </main>
  )
}
export default RestuarantDashboard