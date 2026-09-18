"use client";

import React, { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeMode = "system" | "light" | "dark";

export default function ThemeSection() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>("system");

  const THEME_OPTIONS: { id: ThemeMode; title: string; desc: string; icon: React.ElementType }[] = [
    { id: "system", title: "System Preference", desc: "Adapt automatically to system settings", icon: Monitor },
    { id: "light", title: "Light Mode", desc: "Clean and bright high-contrast theme", icon: Sun },
    { id: "dark", title: "Dark Mode", desc: "Reduced eye-strain for dark rooms", icon: Moon },
  ];

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-base font-bold text-neutral-900">Appearance</h2>
        <p className="text-xs text-neutral-500">Choose how your dashboard interface looks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {THEME_OPTIONS.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedTheme === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => setSelectedTheme(mode.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? "border-orange-500 bg-orange-50/10 ring-2 ring-orange-500/10"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
            >
              <div className={`p-2 rounded-xl w-fit ${isSelected ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-600"}`}>
                <Icon size={18} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-neutral-900">{mode.title}</h3>
                <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">{mode.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}