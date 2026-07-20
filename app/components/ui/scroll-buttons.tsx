"use client"
import { useState , useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
export default function ScrollButtons(){
    const [showTop , setShowTop] = useState(false)
  const [showBottom , setShowBottom] = useState(true);
 useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY 
   const pageHeight = document.documentElement.scrollHeight - window.innerHeight
  setShowTop(scrollPosition > 300) 
  setShowBottom(scrollPosition < pageHeight - 300)
  }
  window.addEventListener("scroll" , handleScroll)
  handleScroll();
  return () => window.removeEventListener("scroll" , handleScroll)
 },[]);
 const scrollToTop = () => {
  window.scrollTo({
   top:0,
   behavior:"smooth" 
  })
 }
   const scrollToBottom = () => {
    window.scrollTo({
      top:document.documentElement.scrollHeight,
      behavior:"smooth"
    })
  }
  return (
    <>
    {showTop && (
      <button onClick={scrollToTop}>
        <ArrowUp/>
      </button>
    )}
    {showBottom && (
      <button onClick={scrollToBottom}>
        <ArrowDown/>
      </button>
    )}
    </>
  )
}