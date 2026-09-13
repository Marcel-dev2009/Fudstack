"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-burn/10 text-brand-burn mb-4">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Message Received!
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
          Thank you for reaching out. A member of our team will get back to you shortly.
        </p>
        <Button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", phone: "", message: "" });
          }}
          className="mt-6 h-10 px-6 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="name"
            className="text-xs font-semibold tracking-tight text-gray-800"
          >
            Full Name <span className="text-brand-burn">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="email"
            className="text-xs font-semibold tracking-tight text-gray-800"
          >
            Email Address <span className="text-brand-burn">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="phone"
            className="text-xs font-semibold tracking-tight text-gray-800"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="message"
            className="text-xs font-semibold tracking-tight text-gray-800"
          >
            Message <span className="text-brand-burn">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/15"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-11 w-full rounded-xl bg-brand-burn text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 hover:bg-brand-burn/90 shadow-md shadow-brand-burn/20 active:scale-[0.98] disabled:opacity-70"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-3.5 w-3.5" />
              </>
            )}
          </span>
        </Button>
      </form>
    </div>
  );
}