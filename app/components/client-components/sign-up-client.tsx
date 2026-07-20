"use client"
import { brand } from "@/brand";
import Image from "next/image"
import {
  User2,
  User,
  Mail,
  Lock,
} from "lucide-react";
import {useRouter} from "next/navigation"
import dashboard from "@/public/clientdash.png"
function SignUpClient() {
   const router = useRouter()
  return (
    <main className="fixed inset-0 flex justify-center items-center bg-neutral-100 p-6 lg:p-10">
      <div className="w-full h-auto max-h-[90dvh]: max-w-175 bg-white rounded-sm shadow-2xl overflow-hidden border border-neutral-200 grid lg:grid-cols-2">

        {/* LEFT */}

        <section className="px-2 py-4"> {/* px-4 py-8 lg:px-5 lg:py-10 flex flex-col justify-center */}

          <div className="w-8 h-8 rounded-sm bg-brand-burn/10 flex items-center justify-center mb-8">
            <User2 className="text-brand-burn w-4 h-4" />
          </div>

          <h1 className="text-md lg:text-lg tracking-tight text-neutral-900">
            Create Client Account
          </h1>

          <p className="text-neutral-500 mt-3 text-xs leading-relaxed max-w-md">
            Search restaurants, Place orders, reservations and customer support experiences
            from one beautiful dashboard.
          </p>

          <form className=""> {/* Submit here */}  {/* mt-10 space-y-5 */}

            <div className="p-2">
              <label className="text-xs tracking-tighter text-neutral-700 mb-2 block">
               Name
              </label>

              <div className="flex px-4 py-2 items-center border rounded-sm border-neutral-200 focus-within:border-brand-burn transition">
                <User className="w-3 h-3 text-neutral-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="flex-1 ml-3 outline-none bg-transparent placeholder:text-xs"
                />
              </div>
            </div>

            {/* Email */}

            <div className="p-2">
              <label className="text-xs tracking-tighter text-neutral-700 mb-2 block">
                Email Address
              </label>

              <div className="flex items-center px-4 py-2 border rounded-sm  border-neutral-200 focus-within:border-brand-burn transition"> {/* px-4 h-14 */}
                <Mail className="w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  placeholder="jdoe@email.com"
                  className="flex-1 ml-3 outline-none bg-transparent placeholder:text-xs"
                />
              </div>
            </div>

            {/* Phone */}

            {/* Password */}

            <div className="p-2">
              <label className="text-xs tracking-tighter text-neutral-700 mb-2 block">
                Password
              </label>

              <div className="flex items-center px-4 py-2 border rounded-sm border-neutral-200 focus-within:border-brand-burn transition">
                <Lock className="w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 ml-3 outline-none bg-transparent placeholder:text-xs"
                />
              </div>
            </div>

            {/* Checkbox */}

            <div className="flex items-start gap-0.5 pt-2">
              <input
                type="checkbox"
                className="mt-1 accent-orange-500"
              />

              <p className="text-xs text-neutral-500">
                I agree to the{" "}
                <span className="text-brand-burn tracking-tighter">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-brand-burn tracking-tighter">
                  Privacy Policy
                </span>
              </p>
            </div>

            <button
              type="button"
              className="w-full mt-2 mb-2 max-w-98 rounded-sm p-2 bg-brand-burn text-white text-xs tracking-tighter hover:brightness-110 transition"
            >
              Create Client Account
            </button>

            <p className="text-center text-xs text-neutral-500">
              Already have an account?{" "}
              <span onClick={() => {
                router.replace("/login")
              }} className="text-brand-burn font-semibold cursor-pointer">
                Sign In
              </span>
            </p>

          </form>
        </section>

        {/* RIGHT PANEL COMES IN PART 2 */}
      
      {/* RIGHT PANEL */}

<section className="hidden lg:flex relative overflow-hidden bg-brand-burn text-white p-12">

  {/* Background Blur */}
 {/*  <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl"/> */}

  {/* Grid Pattern */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage:
        "linear-gradient(to right, white 1px, transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)",
      backgroundSize: "40px 40px",
    }}
  />

  <div className="relative w-full max-w-xl">

    <p className="tracking-tighter text-md font-semibold text-orange-100 mb-4">
     {brand.name}
    </p>

    <h2 className="text-2xl font-bold leading-tight tracking-tighter">
      Everything you
      <br />
       need as a customer
      <br />
      in one dashboard.
    </h2>

    <p className="mt-5 text-orange-100 max-w-md text-xs">
      Search restaurants, reservations, customer support experiences,
      ordering , tracking orders from one
      beautifully designed workspace.
    </p>

    {/* Dashboard */}
    <div className="mt-4">
      <Image src={dashboard} alt={brand.ariaLogo} aria-label={brand.ariaLogo}/>
    </div>
  </div>

</section>
      </div>
    </main>
  )
}
export default SignUpClient


/* 

"use client";



export default function SignUpAgent() {
 
  return (
    
  );
}
*/