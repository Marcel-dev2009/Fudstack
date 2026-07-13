import { Button } from "@/components/ui/button"
import RootHeader from "../ui/general-header"
import ContentRatio from "./aspect-ratio"

function HeroSection() {
  return (
   <>
   <main>
    <RootHeader/>
    <section className="flex flex-col justify-center items-center gap-8 md:mt-30 flex-1">
      <div>
      <p className="text-xl z-10 max-w-175 md:text-2xl lg:text-4xl w-full text-center tracking-tighter m-2 leading-relaxed font-bold">  Manage your businesses <span className="text-brand-burn">smarter</span></p>
      <p className=" text-sm md:text-xl lg-text-3xl font-semibold text-secondary-onyx text-center tracking-tighter">Everything your restaurant needs in one platform</p>
      </div>
      {/* CTA */}
      <div>
        <p className="text-center text-xs md:text-sm font-light text-black/70 max-w-175 tracking-tighter"> Inventory,orders,bookings,deliveries and customer management - all from one platform</p>
      </div>
      <div className="flex">
       <Button variant="link">Learn More</Button>
       <Button className="rounded-sm bg-brand-burn">Get Started</Button>
      </div>
      <ContentRatio/>
    </section>
   </main>
   </>
  )
}
export default HeroSection