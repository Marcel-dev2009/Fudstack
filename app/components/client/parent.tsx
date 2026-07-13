"use client"
import HeroSection from "./hero-section";
// import RootHeader from "./components/ui/general-header";
import About from "./about"
import Services from "./services";
import Pricing from "./pricing";
import Contact from "./contact-us";
import Footer from "./footer";
import Faq from "./faq-section";
function Parent() {
  return (
   <section>
   <HeroSection/>
   <About/>
   <Services/>   
    <Pricing/>
   <Contact/>
   <Faq/>
   <Footer/>
   </section>
 
  )
}
export default Parent