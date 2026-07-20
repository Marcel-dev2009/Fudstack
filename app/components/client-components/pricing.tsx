import PriceGrid from "../ui/pricing-grid"

function Pricing() {
  return (
          <>
    <section
    className="bg-primary-blaster/50 m-8 p-8
    w-auto max-w-300  rounded-sm  mx-auto
    h-auto min-h-[65dvh] outline-1 
    ">
    <div className=" text-center align-baseline w-auto max-w-290 border border-primary-blaster p-8 rounded-md shadow-primary-eggshell">
      <h1 className="text-sm text-brand-burn">pricing</h1> 
      <span className="text-xl font-semibold md:text-3xl">
    <h2 className="tracking-tight">Find Your Perfect Plan.</h2>      
    <h3 className="tracking-tighter">Every Team Deserves Better Tools</h3>
    </span>
    <p className="font-light text-xs tracking-tight">Choose a plan that suits your needs-from startups to enterprises</p>   
    </div>
    <div>
    <PriceGrid/>   
    </div>
    </section>
          </>
  )
}
export default Pricing