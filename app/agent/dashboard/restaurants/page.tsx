/* For the error on restaurant list I'm either going to map or just try another thing altogether  */
import RestaurantList from "./restaurant-list"
import RestaurantManager from "./restaurant-manager"
import { Suspense } from "react"
import SkeletonLoader from "../../../components/ui/skeleton-loader"
  function RestuarantDashboard() {
  return (
    <main className="flex flex-col w-full">
    <RestaurantManager/>
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