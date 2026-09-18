import { Suspense } from "react"
import RestaurantDashboard from "./restaurant-dashboard"
function RestaurantPage() {
  return (
  <Suspense fallback="Loading...">
      <RestaurantDashboard/>
  </Suspense>
  )
}
export default RestaurantPage