import { gridItems } from "@/app/data/data"
import { FaGlobeAfrica } from "react-icons/fa"
function AboutGrid() {
    const data = gridItems
return(
   <>
   <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
     {data.map((data) => (
    <div
    key={data.title}
    className="bg-secondary-onyx/20
     backdrop-blur-sm
     shadow-blue-950
      rounded-2xl
       w-auto 
       max-w-55
       h-auto
       "
    >
     <FaGlobeAfrica className="m-4"/>
     <div>
      <h2 className="m-2 font-semibold align-baseline tracking-tighter">{data.title}</h2>    
     </div>
     <div>
      <p className="text-sm font-light mt-4 m-2 tracking-tighter">{data.description}</p>
     </div>
    </div>
     ))}
   </section>
   </>
)
}
export default AboutGrid