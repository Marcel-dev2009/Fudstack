import { Button } from "@/components/ui/button"
import { Forward } from "lucide-react"
import Link from "next/link"

function Contact() {
  return (
    <>
    <section
    className="
    bg-primary-bone
    h-auto min-h-screen
    "
    >
    <div>
     <span className="flex p-4">
    <h2 className="text-brand-burn tracking-tighter text-md md:text-xl font-semibold">Contact Us</h2>
      <Forward color=" #CC5500" size={15} className="mt-2"/>     
    </span>     
    <div className="flex justify-evenly gap-4 md:gap-8">
   <span className="m-8 tracking-tighter w-auto max-w-78 space-y-0">
   <span className="text-xl md:text-2xl font-meduim leading-tight">Your message means a lot to us!</span>
   <p className="text-sm">
      We&apos;d love to hear from you! whether you have questions about FudStack,need assistance in using the app or just overall navigation of the app. testmonials would go a long way too✨.            
   </p>
   </span>
     <div className="w-full max-w-98 rounded-2xl border sm:mt-4 md:mt-8 border-black/10 bg-primary-blaster p-6 shadow-lg sm:p-8 md:p-10">
  <form className="flex flex-col gap-5">

    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="text-sm font-medium tracking-tight">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="John Doe"
        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 outline-none transition-all duration-300 placeholder:text-black/40 focus:border-brand-apricot focus:ring-1 focus:ring-brand-burn/20"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label htmlFor="email" className="text-sm font-medium tracking-tight">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="john@example.com"
        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 outline-none transition-all duration-300 placeholder:text-black/40 focus:border-brand-apricot focus:ring-1 focus:ring-brand-burn/20"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label htmlFor="phone" className="text-sm font-medium tracking-tight">
        Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        placeholder="+234 800 000 0000"
        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 outline-none transition-all duration-300 placeholder:text-black/40 focus:border-brand-apricot focus:ring-2 focus:ring-brand-burn/20"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label htmlFor="message" className="text-sm font-medium tracking-tight">
        Message
      </label>
      <textarea
        id="message"
        rows={2}
        placeholder="Tell us how we can help..."
        className="w-full resize-none rounded-xl border border-black/20 bg-white px-4 py-3 outline-none transition-all duration-300 placeholder:text-black/40 focus:border-brand-apricot focus:ring-2 focus:ring-brand-burn/20"
      />
    </div>

    <Button
      type="submit"
      className="mt-2 h-12 w-full rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
    >
      Submit
    </Button>

  </form>
</div>
      <span className="self-end gap-y-2">
     <span className="tracking-tight">
     <h3 className="text-sm md:text-md font-semibold">Chat to sales</h3>
      <p className="text-sm font-light">speak to our team.. at marcux@gmail.com</p>
     </span>
     <span>
     <h3 className="text-sm md:text-md font-semibold">Contact</h3>
      <span className="text-sm font-light">
      <p >Enugu State, Nigeria</p>
    <span className="flex flex-col text-blue-500">
            <Link href="tel://+2347071766184">+2347071766184</Link>
      <Link href="tel://+2349122040914">+2349122040914</Link> 
    </span>
      </span>
     </span>
     <span >
     <h3 className="text-sm md:text-md font-semibold">Call us at</h3>
      <p className="text-sm font-light">Tue-Fri.. from 8am to 5pm.</p>
     </span>
    </span>    
    </div>
    </div>
    </section>
    </>
  )
}
export default Contact