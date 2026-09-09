import React from 'react';
import { 
  Utensils, 
  ChefHat, 
  Receipt, 
  Shirt, 
  Flame, 
  Sparkles 
} from 'lucide-react';

interface FloatingIconProps {
  children: React.ReactNode;
  positionClass: string;
  animationDelay?: string;
  animationDuration?: string;
  label: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ 
  children, 
  positionClass, 
  animationDelay = "0s", 
  animationDuration = "3.5s",
  label
}) => {
  return (
    <div 
      className={`absolute pointer-events-none select-none transition-transform ${positionClass}`}
      style={{
        animation: `floatAnimation ${animationDuration} ease-in-out infinite`,
        animationDelay: animationDelay
      }}
      aria-label={label}
    >
      {/* Clean transparent SVG icon without background card boxes */}
      <div className="text-orange-500/85 hover:text-orange-600 transition-colors filter drop-shadow-[0_4px_12px_rgba(249,115,22,0.25)]">
        {children}
      </div>
    </div>
  );
};

const BrandLogo = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Restaurant Brand Logo"
  >
    {/* Outer Animated Decorative Dash Ring */}
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" className="opacity-25" />
    <circle 
      cx="50" 
      cy="50" 
      r="46" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeDasharray="12 10" 
      className="animate-spin-slow opacity-70" 
    />
    
    {/* Gourmet Cloche Cover Base */}
    <path 
      d="M20 62C20 42 32 30 50 30C68 30 80 42 80 62H20Z" 
      fill="currentColor" 
      className="text-orange-500" 
    />
    {/* Handle Knob */}
    <circle cx="50" cy="24" r="5" fill="currentColor" className="text-orange-600" />
    {/* Serving Platter Base */}
    <rect x="15" y="64" width="70" height="6" rx="3" fill="currentColor" className="text-orange-600" />
    
    {/* Steam Animated Accents */}
    <path d="M40 18C40 14 43 12 43 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-orange-400 animate-pulse" />
    <path d="M50 16C50 12 53 10 53 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-orange-400 animate-pulse delay-150" />
    <path d="M60 18C60 14 63 12 63 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-orange-400 animate-pulse delay-300" />
  </svg>
);

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-50/80 via-white to-orange-50/50 text-zinc-800 overflow-hidden select-none p-4 sm:p-6 md:p-8">
      {/* Keyframes style tag for keyframe floating and pulsing animations */}
      <style>{`
        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(5deg);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 25px rgba(249, 115, 22, 0.2);
          }
          50% {
            box-shadow: 0 0 45px rgba(249, 115, 22, 0.4);
          }
        }
        .animate-spin-slow {
          animation: spin 16s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Decorative Ambient Glowing Orbs */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-orange-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute w-44 h-44 sm:w-60 sm:h-60 bg-amber-200/30 rounded-full blur-2xl pointer-events-none -z-10 translate-y-12" />

      {/* Center Canvas Stage */}
      <main className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto my-auto">
        
        {/* Floating Icons Container */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
          
          {/* 1. Fork & Knife Icon (Top-Left) */}
          <FloatingIcon 
            positionClass="top-2 left-3 sm:top-4 sm:left-6 md:top-2 md:left-8" 
            animationDelay="0s" 
            animationDuration="3.6s"
            label="Fork & Knife"
          >
            <Utensils className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
          </FloatingIcon>

          {/* 2. Chef's Hat Icon (Top-Right) */}
          <FloatingIcon 
            positionClass="top-3 right-3 sm:top-5 sm:right-6 md:top-3 md:right-8" 
            animationDelay="0.7s" 
            animationDuration="4s"
            label="Chef's Hat"
          >
            <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-orange-600" />
          </FloatingIcon>

          {/* 3. Money / Price Receipt Icon (Bottom-Left) */}
          <FloatingIcon 
            positionClass="bottom-4 left-4 sm:bottom-6 sm:left-8 md:bottom-4 md:left-10" 
            animationDelay="1.2s" 
            animationDuration="4.2s"
            label="Pricing Receipt"
          >
            <Receipt className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
          </FloatingIcon>

          {/* 4. Apron Icon (Bottom-Right) */}
          <FloatingIcon 
            positionClass="bottom-4 right-4 sm:bottom-6 sm:right-8 md:bottom-4 md:right-10" 
            animationDelay="1.8s" 
            animationDuration="3.8s"
            label="Chef's Apron"
          >
            <Shirt className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
          </FloatingIcon>

          {/* 5. Flame Accent (Top-Center) */}
          <FloatingIcon 
            positionClass="-top-4 sm:-top-6 left-1/2 -translate-x-1/2" 
            animationDelay="0.3s" 
            animationDuration="3.2s"
            label="Hot Cooking Flame"
          >
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-amber-500/20" />
          </FloatingIcon>

          {/* Center Brand SVG Badge (Plug in your SVG/Logo here) */}
          <div 
            className="relative z-10 p-6 sm:p-8 md:p-9 rounded-full bg-white border border-orange-100 shadow-xl flex items-center justify-center transition-transform"
            style={{ animation: 'pulseGlow 3s ease-in-out infinite' }}
          >
            <BrandLogo className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-orange-500" />
          </div>

        </div>

        {/* Text Hierarchy Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center max-w-xs sm:max-w-sm md:max-w-md px-2 z-10 space-y-2.5 sm:space-y-3">
          
          {/* Small Top Badge / Sub-text */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200/60 text-orange-700 text-xs sm:text-sm font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />
            <span>Preparing your table</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 font-serif">
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Loading your page...
            </span>
          </h1>

          {/* Micro Copy Subtext */}
          <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed">
            Gathering delicious recipes and fresh content for you.
          </p>

          {/* Indeterminate Shimmer Progress Bar */}
          <div className="pt-2 w-full max-w-[200px] sm:max-w-[240px] mx-auto">
            <div className="relative w-full h-1.5 sm:h-2 bg-orange-100 rounded-full overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-full animate-[shimmer_1.6s_infinite_linear]" />
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}