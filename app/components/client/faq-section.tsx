"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/app/data/data";
function Faq() {
 const [active, setActive] = useState<number | null>(0);
  return (
   <section
     className="bg-secondary-licorice text-white
    w-auto
    h-auto min-h-[80dvh]"
   >
    <div className="grid grid-cols-1 md:grid-cols-2">
         <div className="flex flex-col gap-5 md:gap-20">
       <motion.div

        initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
       >
             <p className="text-md md:text-xl tracking-tighter font-semibold p-4 md:p-8  md:text-md text-center">Here are general questions asked by customers</p> 
       </motion.div>

          <div className=" flex flex-col mx-auto">
             <p className="text-sm w-auto max-w-98 tracking-tight">
          our friendly team is always here to help you with quick, clear, and reliable answers whenever needed.
          </p>   
         <Button className="rounded-sm tracking-tighter text-xs w-fit mt-4">Contact Sales</Button>         
          </div>
         </div>
         <div>
               {faqs.map((faq, index) => {
            const open = active === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * .08,
                  duration: .5
                }}
                viewport={{ once: true }}
                className="overflow-hidden m-8 rounded-md border border-white/10 bg-white/5 backdrop-blur-2xl"
              >
                <button
                  onClick={() => setActive(open ? null : index)}
                  className="flex w-full items-center justify-between px-2 py-2 text-left"
                >
                  <h3 className="text-sm md:text-md font-medium tracking-tight text-white">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: open ? 180 : 0
                    }}
                    transition={{
                      duration: .35
                    }}
                    className="rounded-full bg-orange-500/10 p-2 text-orange-400"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1
                      }}
                      exit={{
                        height: 0,
                        opacity: 0
                      }}
                      transition={{
                        duration: .35
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-8 pb-8 pt-6">
                        <p className="max-w-4xl  text-md leading-8 tracking-tight text-neutral-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
         </div>
    </div>
   </section>
  )
}
export default Faq