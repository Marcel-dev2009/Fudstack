"use client"
import { handleOnboarding } from "@/lib/backendOperation"
import { useState } from "react"
import { locationData, organizationData, restaurantData } from "@/types";
import dynamic from "next/dynamic"
import {AnimatePresence} from "framer-motion";
import { auth } from "@/lib/auth";
import { toast } from "sonner";
const VerificationNotification = dynamic(() => import("../../components/agent-components/onboarding/verify-message"))
const CreateOrganization = dynamic(() => import("../../components/agent-components/onboarding/create-organization"));
 const CreateRestuarant = dynamic(() => import("../../components/agent-components/onboarding/create-restuarant"));
 const VerifyCreation = dynamic(() => import("../../components/agent-components/onboarding/verify-creation"));
const LocationConfig = dynamic(() => import("../../components/agent-components/onboarding/location-config"))
type Session = Awaited<ReturnType<typeof auth.api.getSession>>
interface Props{
 session:Session
}
function OnboardingContainer({session}:Props) {
 const [hasSentVerification , setHasSentVerification] = useState(false);
   const [step , setStep] = useState<number>(1);
    const [organizationData , setOrganizationData] = useState<organizationData>({
      name: "",
      logoUrl:"",
      description:"",
    })
    const [restaurantData , setRestaurantData] = useState<restaurantData>({
      name: "",
      logoUrl:"",
      phone:"",
      email:""
    })
    const [locationData , setLocationData] = useState<locationData>({
      city:"",
      state:"",
      address:"",
      businessHours:""
    })
     const handleOnboardingSubmit = async () => {
      try{
      if(!session) return;
        await handleOnboarding(session.user.id, {
        organization:organizationData, 
        restaurant:restaurantData,
        location:locationData
      });
      }catch(err){
      toast.error(`
        error carrying out operation:${
          err instanceof Error ? err.message : "Unknown Error"
        }
        `)
      }finally{
        //setOnboardingLoading(false)
      }
    }
  return (
     <AnimatePresence mode="wait">
        <section className="fixed inset-0 bg-white flex justify-center items-center"
        >
         <div className=" relative flex justify-center items-center h-auto min-h-[90dvh] w-auto shadow-md">
        {step === 1 && (
         <CreateOrganization setStep={setStep} setOrganizationData={setOrganizationData} organizationName={organizationData.name} organizationDescription={organizationData.description}/>
        )}
        {step === 2 && (
         <CreateRestuarant setStep={setStep} setRestaurantData={setRestaurantData} restaurantName={restaurantData.name} restaurantEmail={restaurantData.email} restaurantPhone={restaurantData.phone}/>
        )}
        {step === 3 && (
         hasSentVerification ? (  <VerificationNotification session={session} setStep={setStep}/>) : (<LocationConfig setStep={setStep} setLocationData={setLocationData} session={session} state={locationData.state} city={locationData.city} address={locationData.address} businessHours={locationData.businessHours} setHasSentVerification={setHasSentVerification}/>)
        )}
        {step === 4 && session && (
          <VerifyCreation setStep={setStep} handleOnboardingSubmit={handleOnboardingSubmit} session={session}/>
        )}
         </div>
        </section>
     </AnimatePresence>
  )
}
export default OnboardingContainer