import ServiceGrid from "../ui/service-grid"

function Services() {
  return (
    <section
    className="bg-secondary-licorice text-white
    w-auto
    h-auto min-h-[80dvh]
    "
    >
           <h2 className="p-4 text-sm font-light text-center text-brand-apricot tracking-tighter">Our Services</h2>    
    <div className="text-center">
     <h1 className="font-heading md:text-xl lg:text-2xl font-bold tracking-tighter">The services we offer include ...</h1>
     <div>
       <ServiceGrid/>   
     </div>
    </div>
    </section>
  )
}
export default Services