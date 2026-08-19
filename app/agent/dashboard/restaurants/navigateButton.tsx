"use client";
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
function NavigateButton({userId}:{userId:string}) {
  const router = useRouter();        
  return (
   <div    className="flex justify-end">
<button
title="Visit your restaurant"
onClick={() => {
          router.push(`/restaurants/${userId}`);
}}
          className="
          flex h-9 w-9 items-center justify-center
          rounded-lg border border-black/5
          text-slate-400
          transition-all duration-200
          group-hover:border-brand-burn/20
          group-hover:bg-brand-burn/5
          group-hover:text-brand-burn
          "
>
          <ChevronRight size={16} />
</button>
                  </div>
  )
}
export default NavigateButton