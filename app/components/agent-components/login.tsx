"use client"
import { brand } from "@/brand";
  import {
  User,
  User2,
  Lock,
} from "lucide-react";
import {useRouter} from "next/navigation"
function LoginAgent() {
  const router = useRouter();
  return (
  <main className="fixed inset-0 flex justify-center items-center bg-neutral-100 p-6 lg:p-10">
      <div className="w-full h-auto max-h-[90dvh]: max-w-175 bg-white rounded-sm shadow-2xl overflow-hidden border border-neutral-200 grid lg:grid-cols-2">

        {/* LEFT */}

        <section className="px-2 py-4"> {/* px-4 py-8 lg:px-5 lg:py-10 flex flex-col justify-center */}

          <div className="w-8 h-8 rounded-sm bg-brand-burn/10 flex items-center justify-center mb-8">
            <User2 className="text-brand-burn w-4 h-4" />
          </div>

          <h1 className="text-md lg:text-lg tracking-tight text-neutral-900">
            Login to your account
          </h1>

          <p className="text-neutral-500 mt-3 text-xs leading-relaxed max-w-md">
            Enter your credentials to get access to all our app&apos;s features and enjoy seamless workflow
          </p>

          <form className=""> {/* Submit here */}  {/* mt-10 space-y-5 */}

            {/* Owner */}

            <div className="p-2">
              <label className="text-xs tracking-tighter text-neutral-700 mb-2 block">
                Owner Name
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

           
            <button
              type="button"
              className="w-full mt-2 mb-2 max-w-98 rounded-sm p-2 bg-brand-burn text-white text-xs tracking-tighter hover:brightness-110 transition"
            >
              Login
            </button>

            <p className="text-center text-xs text-neutral-500">
              Don&apos;t have an account?{" "}
              <span onClick={() => {
                router.replace("/agent/auth/sign-up")
              }} className="text-brand-burn font-semibold cursor-pointer">
                Sign Up
              </span>
            </p>

          </form>
        </section>

        {/* RIGHT PANEL COMES IN PART 2 */}
      
      {/* RIGHT PANEL */}

<section className="hidden lg:flex relative overflow-hidden bg-brand-burn text-white p-12 ">

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
      Your
      <br />
      All in One
      <br />
      Platform for seamless workflow
    </h2>

    <p className="mt-5 text-orange-100 max-w-md text-xs">
       Enter your credentials to get access to all our apps
    </p>

    {/* Dashboard */}
      <div className="relative mt-6 h-auto max-h-[20dvh]">

      <div className="rounded-[28px] bg-white shadow-2xl p-6 text-neutral-900">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h3 className="font-semibold text-sm tracking-tighter">
              Restaurant Dashboard
            </h3>

            <p className="text-xs tracking-tighter text-neutral-400">
              Today&apos;s Overview
            </p>
          </div>

          <div className="px-4 py-2 rounded-full bg-brand-burn/10 text-brand-burn text-xs  font-medium">
            Live
          </div>

        </div>
       <div className="w-full relative">
         <svg
            viewBox="0 0 300 100"
            className="w-full h-10 absolute"
          >
            <polyline
              fill="none"
              stroke="#F97316"
              strokeWidth="5"
              points="
              0,70
              40,55
              80,60
              120,35
              160,45
              200,22
              240,38
              300,18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

       </div>
        {/* Cards */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="rounded-2xl bg-orange-50 p-5">
            <p className="text-sm text-neutral-500">
              Revenue
            </p>

            <h4 className="text-xl font-bold mt-2">
              ₦245k
            </h4>

            <p className="text-green-600 text-xs mt-2">
              +12.8%
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-100 p-5">
            <p className="text-sm text-neutral-500">
              Orders
            </p>

            <h4 className="text-xl font-bold mt-2">
              128
            </h4>

            <p className="text-brand-burn text-xs mt-2">
              Active Today
            </p>
          </div>

        </div>

      </div>
    </div>  {/* Dashboardend */}
    </div>

</section>
      </div>
    </main>
  )
}
export default LoginAgent


