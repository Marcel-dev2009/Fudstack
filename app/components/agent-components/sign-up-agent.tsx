"use client";

import React, { ChangeEvent, SubmitEventHandler, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ChefHat, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { brand } from "@/brand";
import { updateUserRoleForAgent } from "@/lib/server-operation";
import { signUp } from "@/lib/actions/signupAgent";
import { signUpInput } from "@/lib/z-schema/signup/schema";
import dashboard from "@/public/authMock.png";

const Loading = dynamic(() => import("../../components/ui/loading"), { ssr: false });

export default function SignUpAgent() {
  const router = useRouter();
  const [formData, setFormData] = useState<signUpInput>({
    name: "",
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const handleDataChange =
    (field: keyof signUpInput) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e:React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!agreed) {
      toast.warning("You must agree to the Terms & Privacy Policy to continue.");
      return;
    }

    try {
      setLoading(true);

      const result = await signUp(formData);
      if (!result?.success) {
        toast.error(result?.message || "Failed to create organization account");
        return;
      }

      toast.success("Agent account successfully created!");
      await updateUserRoleForAgent();
      router.replace("/agent/onboarding");
    } catch (err) {
      toast.error(
        `Authentication error: ${
          err instanceof Error ? err.message : "An unknown error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900/5 p-4 sm:p-6 lg:p-10 scrollbar-none">
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl min-h-155 bg-white rounded-3xl shadow-2xl shadow-neutral-950/10 overflow-hidden border border-neutral-200/80 grid grid-cols-1 lg:grid-cols-12"
      >
        {/* LEFT PANEL: Form */}
        <section className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header / Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-burn/10 flex items-center justify-center ring-1 ring-brand-burn/20">
                <ChefHat className="text-brand-burn w-5 h-5" />
              </div>
              <span className="text-sm font-bold tracking-tight text-neutral-900">
                {brand.name}
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                Create Partner Account
              </h1>
              <p className="text-neutral-500 mt-2 text-xs sm:text-sm leading-relaxed max-w-sm">
                Manage orders, inventory, reservations, and customer experience from one dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold tracking-tight text-neutral-700 block"
                >
                  Owner / Manager Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    autoComplete="name"
                    onChange={handleDataChange("name")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold tracking-tight text-neutral-700 block"
                >
                  Work Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="organization@email.com"
                    value={formData.email}
                    autoComplete="email"
                    onChange={handleDataChange("email")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold tracking-tight text-neutral-700 block"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="At least 8 characters"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={handleDataChange("password")}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                    tabIndex={-1}
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
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  onChange={handleCheck}
                  checked={agreed}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-brand-burn focus:ring-brand-burn/20 accent-brand-burn cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-neutral-500 leading-normal cursor-pointer">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-brand-burn font-medium hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-burn font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreed || isLoading}
                className="w-full h-11 mt-3 rounded-xl bg-brand-burn text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 hover:bg-brand-burn/90 shadow-md shadow-brand-burn/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-burn flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <span>Create Agent Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Navigation */}
          <div className="pt-6 text-center lg:text-left border-t border-neutral-100 mt-6">
            <p className="text-xs text-neutral-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.replace("/agent/auth/sign-in")}
                className="text-brand-burn font-semibold hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </div>
        </section>

        {/* RIGHT PANEL: Showcase */}
        <section className="hidden lg:flex lg:col-span-6 relative overflow-hidden bg-linear-to-br from-brand-burn via-orange-600 to-amber-700 text-white p-10 xl:p-12 flex-col justify-between">
          {/* Ambient Lighting Gradients */}
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

          {/* Grid Background Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-200 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-6 border border-white/20">
              {brand.name} Operations Hub
            </span>

            <h2 className="text-2xl xl:text-3xl font-bold leading-tight tracking-tight">
              Everything your restaurant needs in one workspace.
            </h2>

            <p className="mt-4 text-orange-100 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Monitor daily revenue, kitchen orders, table reservations, and sales analytics effortlessly.
            </p>
          </div>

          {/* Dashboard Preview Frame */}
          <div className="relative z-10 mt-8 group">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={dashboard}
                alt={`${brand.name} Dashboard Preview`}
                priority
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] text-orange-200">
            <span>Secure 256-Bit SSL Encryption</span>
            <span>Real-time Data Sync</span>
          </div>
        </section>
      </motion.main>
    </div>
  );
}