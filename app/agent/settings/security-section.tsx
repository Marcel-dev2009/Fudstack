"use client";

import React, { useState } from "react";
import { KeyRound, Sparkles,} from "lucide-react";

export default function SecuritySection() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your password update backend logic goes here
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* CHANGE PASSWORD (AVAILABLE) */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-bold text-neutral-900">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-700">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-sm transition-all active:scale-95"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* PRO FEATURES (DISABLED / FADED) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-neutral-900">Advanced Security Features</h2>
            <p className="text-xs text-neutral-500">Upgrade to enterprise tier to unlock these options.</p>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} /> Pro Plan
          </span>
        </div>

        <div className="relative rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-3 opacity-60 pointer-events-none select-none">
          {/* SSO Card */}
          <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-neutral-900">OAuth & Single Sign-On (SSO)</h3>
              <p className="text-[11px] text-neutral-500">Connect Google, Okta, or Azure AD workspace authentication.</p>
            </div>
            <div className="w-8 h-4 bg-neutral-200 rounded-full" />
          </div>

          {/* 2FA Card */}
          <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-neutral-900">Two-Factor Authentication (2FA)</h3>
              <p className="text-[11px] text-neutral-500">Require physical key or authenticator app for staff logins.</p>
            </div>
            <div className="w-8 h-4 bg-neutral-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}