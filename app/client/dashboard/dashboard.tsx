import { getAllRestaurant } from "@/lib/cache/getAllRestaurant"
import ClientDashboard from "./client-dashboard-page"
async function Dashboard() {
const restaurantList = await getAllRestaurant();
if(!restaurantList || restaurantList.length === 0) return "No Restaurant is listed on our directory";          
  return (
    <ClientDashboard restaurantList={restaurantList}/>
  )
}
export default Dashboard