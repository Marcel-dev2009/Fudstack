import { getRestaurants } from "@/lib/backendOperation";
/* 
When using dynamic metadata in nextjs the dynamic route [id] returns a promise object that can be resolved to get what [id] was actually substituted with 
*/
async function RestaurantDashboard() {
  const restaurant = await getRestaurants();    
  if(!restaurant) throw new Error(`No restaurant found!`)    
  return (
    <div>
     {restaurant.map((res) => (
      <div key={res.id}>Restaurant Page for restaurant:{res.name} , id:{res.id}</div>    
     ))}     
    </div>
  )
}
export default RestaurantDashboard