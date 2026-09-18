import { getRestaurants } from "@/lib/server-operation"
import ProductOverview from "./product-overview"
async function ProductConainer() { 
 const restaurant = await getRestaurants();
 if(!restaurant) return null; 
  return (
   <ProductOverview restaurant={restaurant}/>
  )
}
export default ProductConainer