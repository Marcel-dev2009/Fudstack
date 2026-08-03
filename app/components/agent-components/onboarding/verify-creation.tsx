/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { SetStateAction, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiOutlineMailOpen } from "react-icons/hi";
import { verifyOtp } from "@/lib/actions/verifyOtp";
import { auth } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/actions/sendVerficationEmail";
import { toast } from "sonner";
import Loading from "../../ui/loading";
 type Session = Awaited<ReturnType<typeof auth.api.getSession>> | null
interface Props {
  setStep: React.Dispatch<SetStateAction<number>>;
  handleOnboardingSubmit:() => void;
  session:Session
}
function VerifyCreation({ setStep , handleOnboardingSubmit ,session}: Props) {
  const router = useRouter();
  
  // Timer state manager (Starts at 59 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const [canResend, setCanResend] = useState<boolean>(false);
 const [isVerifying , setIsVerifying] = useState(false);
  // Six Input Block References
  const inputRefs = [ //this guy right here enables you to control focus 
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
   
  // Countdown timer tracker effect
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handler to restart verification countdown sequence safely
  
   if (!session){
    return null;
  };

  const handleResendCode = async () => {
    if (!canResend) return;
   await sendVerificationEmail(session.user.email)
    setTimeLeft(59);
    setCanResend(false);
  };
  
  const handleVerification = async () => {
    if(isVerifying) return;
     const code = inputRefs.map((ref) => ref.current?.value || "").join("");
     if(code.length !== 6) return;
     try{
      setIsVerifying(true);
      const result = await verifyOtp( session.user.email , code);  
     if(result.success){
      await handleOnboardingSubmit();
      router.replace("/agent/dashboard")
     } else{
      toast.error("Invalid code");
     }
     }catch(err){
      toast.error(
  `Error creating user: ${
    err instanceof Error ? err.message : "Unknown error"
  }`
);
     }finally{
      setIsVerifying(false);
     }
     
    }

  // Advanced Clipboard Interceptor / Clipboard Paste auto-fill engine
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Validate if clipboard content fits a 6-digit numeric pattern sequence
    if (/^\d{6}$/.test(pastedData)) {
      pastedData.split("").forEach((char, index) => {
        if (inputRefs[index]?.current) {
          inputRefs[index].current!.value = char;
        }
      });
      // Automatically pull active input target focus to final input frame boundary node
      inputRefs[5].current?.focus();
    }
  };

  // Enforces only numeric keystrokes inside structural parameters
  const handleInputChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Erase non-digits globally instantly if passed by alternative entry methods
    if (value && !/^\d+$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value.length === 1) {
      if(index < 5){
    inputRefs[index + 1].current?.focus();
      }  else {
      await handleVerification()
    }
    } 
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, height: 120, filter: "blur(4px)" }}
      animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      exit={{ opacity: 0, height: 120, filter: "blur(4px)" }}
      className="w-full flex justify-center items-center p-4"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden p-6 md:p-8 flex flex-col items-center text-center">
        <div>
          <p className="text-xs tracking-tighter text-brand-burn font-bold">STEP 4 OF 4</p>
        </div>
        {/* Animated Mail Icon Badge */}
        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-4">
          <HiOutlineMailOpen className="w-6 h-6" />
        </div>

        {/* Header Text */}
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 mb-1.5">
          Verify Your Creation
        </h1>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mb-6">
          We have sent a secure 6-digit confirmation code to your email address. Enter it below to activate your account.
        </p>

        {/* Six Block V erification Inputs */}
        <div className="flex gap-2 sm:gap-3 justify-center mb-6 w-full">
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={1}
              disabled={isVerifying}
              pattern="\d*"
              inputMode="numeric"
              onPaste={index === 0 ? handlePaste : undefined} // Listen to paste events directly on block one
              onChange={(e) => {
                handleInputChange(index, e);
              }}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold border border-neutral-200 rounded-xl bg-neutral-50/50 text-neutral-900 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
              placeholder="•"
            />
          ))}
        </div>

        {/* Dynamic Countdown Text Wrapper */}
        <div className="text-[11px] text-neutral-400 mb-8 select-none">
          {canResend ? (
            <p>
              Didn&apos;t receive the code?{" "}
              <button 
                type="button"
                onClick={handleResendCode}
                className="text-orange-500 font-semibold hover:underline cursor-pointer focus:outline-none"
              >
                Resend Code
              </button>
            </p>
          ) : (
            <p>
              Resend code available in{" "}
              <span className="text-neutral-700 font-medium">
                0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="w-full pt-4 border-t border-neutral-100 flex flex-row items-center justify-between gap-4">
            {isVerifying ? (
                <button
               disabled={isVerifying}
             className="px-5 py-2 font-medium text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150"
            >
            <Loading/>
            </button>
            ) : (
                   <button
            onClick={() => setStep((prev) => prev - 1)}
             className="px-5 py-2 font-medium text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150"
            >
            Back 
            </button>
            )}
        </div>

      </div>
    </motion.section>
  );
}

export default VerifyCreation;
