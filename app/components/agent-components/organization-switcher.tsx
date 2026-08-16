"use client"
import { AnimatePresence , motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
type Organization = {
  id: string;
  name: string;
};
export default function OrganizationSwitcher({
  organizationName,
  organizations,
}: {
  organizationName: string;
  organizations: Organization[];
}) {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: -8,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -8,
          scale: 0.97,
        }}
        transition={{
          duration: 0.18,
        }}
        className="
          absolute right-0 top-[calc(100%+10px)]
          z-50 w-64
          overflow-hidden rounded-2xl
          border border-black/5
          bg-white
          p-2
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        "
      >
        <div className="px-3 pb-2 pt-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
            Current organization
          </p>

          <div className="mt-2 rounded-xl bg-brand-burn/10 px-3 py-2.5">
            <p className="text-xs font-semibold text-brand-burn">
              {organizationName}
            </p>
          </div>
        </div>

        <div className="my-2 border-t border-black/5" />

        <p className="px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          Your organizations
        </p>

        <div className="mt-1 space-y-1">
          {/* To understand what this actually does */}
          {organizations
            .filter((organization) => organization.name !== organizationName)
            .map((organization) => (
              <button
                key={organization.id}
                onClick={() => {
                  router.push(
                    `/agent/dashboard?organization=${organization.id}`
                  );
                }}
                className="
                  flex w-full items-center rounded-xl
                  px-3 py-2.5 text-left
                  text-xs text-slate-600
                  transition-colors
                  hover:bg-slate-50
                "
              >
                {organization.name}
              </button>
            ))}
        </div>

        <div className="my-2 border-t border-black/5" />

        <button
          onClick={() => {
            // Create organization modal comes later.
          }}
          className="
            flex w-full items-center gap-2
            rounded-xl bg-brand-burn
            px-3 py-2.5
            text-xs font-semibold text-white
            transition-all duration-200
            hover:brightness-95
          "
        >
          <Plus size={12} />
          Create organization
        </button>
      </motion.div>
    </AnimatePresence>
  );
}