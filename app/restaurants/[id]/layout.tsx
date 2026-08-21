import { brand } from "@/brand";
import RestaurantSideBar from "./sidebar";
import { Metadata } from "next"
type Props = {
   params : Promise<{id:string}>    
}
export const generateMetadata =  async ({params}:Props):Promise<Metadata> => {
 const name = (await params).id;
 return {
   title:`${brand.name} - ${name}`       
 }
}
function RestaurantLayout({children}:{children:React.ReactNode}) {
  return (
    <main>
    <RestaurantSideBar/>
       {children}   
    </main>
  )
}
export default RestaurantLayout