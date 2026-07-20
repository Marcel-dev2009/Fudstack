"use client"
import { AspectRatio } from "@/components/ui/aspect-ration"
import Dashboard from "../../../public/mock.jpeg"
import Image from "next/image"
function ContentRatio() {
  return (
          <>
     <AspectRatio ratio={16 / 9} className="md:w-full mx-auto rounded-md shadow-lg h-auto max-h-[70dvh] md:max-w-250 w-70  bg-primary-pearl">
     <Image src={Dashboard} className="object-cover" alt="Mock User dashboard" aria-label="User Dashboard"/>
     </AspectRatio>
          </>
  )
}
export default ContentRatio