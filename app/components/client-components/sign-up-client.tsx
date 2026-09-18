"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User2,
  User,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { brand } from "@/brand";
import dashboard from "@/public/clientdash.png";
import { signUp } from "@/lib/actions/signupClient";
import { updateUserRoleForClient } from "@/lib/server-operation";
import { getUserSession } from "@/lib/actions/getSession";

function SignUpClient() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.warning("Please fill out all required fields.");
      return;
    }

    if (!agreed) {
      toast.warning("Please accept the Terms & Conditions to proceed.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signUp({ email, password, name });
      if (!result.success) {
        toast.error("Failed to create account. Please try again.");
        return;
      }
      const session = await getUserSession();
      if (!session) return;

      toast.success("Account created successfully!");
      await updateUserRoleForClient(session.user.id);
      router.replace("/client/dashboard");
    } catch (err) {
      toast.error(
        `Authentication error: ${
          err instanceof Error ? err.message : "An unknown error occurred"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4 sm:p-6 backdrop-blur-sm">
      <motion.main
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-neutral-900/10 border border-neutral-200/80 grid lg:grid-cols-12 max-h-[92vh]"
      >
        {/* LEFT FORM PANEL */}
        <section className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Logo / Brand Mark */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-brand-burn/10 flex items-center justify-center border border-brand-burn/20">
                <User2 className="text-brand-burn w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-neutral-900 tracking-tight">
                {brand.name}
              </span>
            </div>

            {/* Header Text */}
            <div className="space-y-1 mb-6">
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">
                Create Client Account
              </h1>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Discover restaurants, place instant orders, manage reservations, and track deliveries.
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                  Full Name
                </label>
                <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                  <User className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={name}
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full ml-2.5 outline-none bg-transparent text-xs font-medium text-neutral-800 placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                  Email Address
                </label>
                <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full ml-2.5 outline-none bg-transparent text-xs font-medium text-neutral-800 placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Password with Visibility Toggle */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                  Password
                </label>
                <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                  <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full ml-2.5 pr-2 outline-none bg-transparent text-xs font-medium text-neutral-800 placeholder:text-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-neutral-400 hover:text-neutral-700 transition-colors shrink-0 p-0.5 rounded-md focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-neutral-300 text-brand-burn focus:ring-brand-burn/20 accent-brand-burn cursor-pointer"
                  onChange={handleCheck}
                  checked={agreed}
                />
                <label htmlFor="terms-checkbox" className="text-[11px] leading-snug text-neutral-500 select-none cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="font-semibold text-brand-burn hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-semibold text-brand-burn hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-burn text-white text-xs font-semibold tracking-wide hover:brightness-110 active:scale-[0.99] disabled:opacity-60 transition-all shadow-md shadow-brand-burn/20 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Client Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-center text-xs text-neutral-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.replace("/client/auth/sign-in")}
              className="text-brand-burn font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </section>

        {/* RIGHT HERO BANNER PANEL */}
        <section className="hidden lg:col-span-6 lg:flex flex-col justify-between relative overflow-hidden bg-brand-burn text-white p-8 md:p-10 border-l border-white/10">
          {/* Subtle Radial Glows */}
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 space-y-3">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-orange-100 backdrop-blur-md">
              {brand.name} Experience
            </span>

            <h2 className="text-xl md:text-2xl font-extrabold leading-snug tracking-tight text-white">
              Everything you need as a customer in one dashboard.
            </h2>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Discover local favorites, reserve tables, track orders real-time, and get direct support from one unified workspace.
            </p>
          </div>

          {/* Dashboard Preview Card */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
            <div className="rounded-xl overflow-hidden border border-white/20 bg-black/20 shadow-2xl backdrop-blur-sm group">
              <Image
                src={dashboard}
                alt={brand.ariaLogo ?? "Dashboard Preview"}
                aria-label={brand.ariaLogo}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}

export default SignUpClient;