"use client";
import {motion} from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
function RefreshButton() {
const [refreshing, setRefreshing] = useState(false);
const router = useRouter(); 
const handleRefresh = () => {
  setRefreshing(true);
  startTransition(() => {
   router.refresh();   
  });
  setTimeout(() => {
    setRefreshing(false);
  },650)        
}        
  return (
     <button
          onClick={handleRefresh}
          title="Refresh page"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg bg-brand-burn
            text-white shadow-sm
            transition-all
            hover:scale-105
          "
        >
          <motion.div
            animate={{
              rotate: refreshing ? [0, 180, 150, 180] : 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
          >
            <RefreshCw size={14} />
          </motion.div>
        </button>
  )
}
export default RefreshButton