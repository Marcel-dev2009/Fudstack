import { Button } from "@/components/ui/button"
function Form() {
  return (
    <div className="w-full max-w-98 rounded-2xl border sm:mt-4 md:mt-6 border-black/10 bg-primary-blaster p-6 shadow-lg sm:p-8 md:p- h-auto">
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
  )
}
export default Form