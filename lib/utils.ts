import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RefObject } from "react"
import gsap from "gsap"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleEnter = (refObject:RefObject<HTMLButtonElement | null>) => {
 gsap.to(refObject.current , {
  scale:0.8,
     y:-2,
     duration:0.2
 }) 
}
export const handleLeave = (refObject:RefObject<HTMLButtonElement | null>) => {
 gsap.to(refObject.current , {
    scale:1,
    y:0,
    duration:0.2
 }) 
}

