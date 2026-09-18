"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User2,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { brand } from "@/brand";
import { signIn } from "@/lib/actions/loginClient";

function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.warning("Please fill out all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn({ email, password });

      if (!result.success) {
        toast.error("No account found with provided credentials.");
        return;
      }

      toast.success("Logged in successfully!");
      router.push("/client/dashboard");
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
                Welcome back
              </h1>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Enter your credentials to access your account and enjoy a seamless dining experience.
              </p>
            </div>

            {/* Signin Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                    Password
                  </label>
                </div>
                <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                  <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="current-password"
                    placeholder="Enter your password"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 mt-2 rounded-xl bg-brand-burn text-white text-xs font-semibold tracking-wide hover:brightness-110 active:scale-[0.99] disabled:opacity-60 transition-all shadow-md shadow-brand-burn/20 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-center text-xs text-neutral-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.replace("/client/auth/sign-up")}
              className="text-brand-burn font-semibold hover:underline"
            >
              Sign Up
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
              {brand.name}
            </span>

            <h2 className="text-xl md:text-2xl font-extrabold leading-snug tracking-tight text-white">
              Your all-in-one platform for seamless dining workflows.
            </h2>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Log in to manage orders, browse nearby restaurants, check table availability, and keep track of recent activity.
            </p>
          </div>

          {/* Dashboard Preview Card */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
            <div className="rounded-2xl bg-white shadow-2xl p-5 text-neutral-900 border border-white/20 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div>
                  <h3 className="font-bold text-xs tracking-tight text-neutral-900">
                    Client Dashboard
                  </h3>
                  <p className="text-[10px] text-neutral-400">Today&apos;s Overview</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-orange-50/80 p-3.5 border border-orange-100">
                  <p className="text-[10px] font-medium text-neutral-500">Active Orders</p>
                  <h4 className="text-lg font-extrabold text-neutral-900 mt-0.5">2</h4>
                </div>

                <div className="rounded-xl bg-neutral-50 p-3.5 border border-neutral-100">
                  <p className="text-[10px] font-medium text-neutral-500">Total Spent</p>
                  <h4 className="text-lg font-extrabold text-neutral-900 mt-0.5">$68</h4>
                  <p className="text-brand-burn text-[9px] font-semibold mt-0.5">Updated Today</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}

export default LoginClient;