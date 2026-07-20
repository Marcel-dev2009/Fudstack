"use client"
import Link from "next/link"
import { ArrowDown, ArrowUp } from "lucide-react"
import { SetStateAction, useEffect , useState} from "react"
import {motion} from "framer-motion"
import { MdClose } from "react-icons/md"
import { useRef } from "react"
interface Props{
 setOpen:React.Dispatch<SetStateAction<boolean>>,
 setCustomerType:React.Dispatch<SetStateAction< "select" | "client" | "agent">>,
}

function AgentTerms({setOpen , setCustomerType}:Props) {
  const text = `("Agreement")`
  
  return (
   <>
   <section  className="relative">
     <div className="flex justify-between m-4">
         <p className="font-semibold text-xs md:text-sm tracking-tighter">Terms and agreement<span className="text-brand-burn"> for agents..</span></p>     
        <button  className="justify-end size-10 w-fit h-fit hover:bg-brand-apricot p-1 rounded-full" 
        onClick={() => {
          setOpen(false);
          setCustomerType("select")
        }}>
          <MdClose size={15}/>    
        </button>
      </div>

     

      <div>
        <div className="">
        
  <span className="w-auto max-w-98 m-2 text-xs text-wrap">
<pre  className="m-2 text-sm  tracking-tighter">
  RESTAURANT PARTNER TERMS & AGREEMENT <br />

Welcome to FudStack.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap font-semibold">
  This Restaurant Partner Agreement {text} governs your use of the FudStack platform as a registered restaurant or food business.

By registering your restaurant, you acknowledge that you have read, understood, and agreed to the following terms.
</pre>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold m-2 ">1.ELIGIBILITY: {""}</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  The restaurant confirms that it is a legally operating business authorized to prepare and sell food within its jurisdiction. The restaurant is solely responsible for maintaining all required business registrations, licenses, health permits, and certifications.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold m-2">2. ACCOUNT INFORMATION: {""}</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  The restaurant agrees to provide complete and accurate information during registration, including business name, address, contact details, operating hours, and banking information where applicable.

The restaurant is responsible for maintaining the security of its account credentials.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold m-2">3. MENU MANAGEMENT: {""}</pre>


<pre className="m-2">The restaurant is responsible for:</pre>
<span className="w-auto max-w-98 m-2 flex flex-col text-xs text-wrap">
<pre>• Maintaining accurate menu items.</pre>
<pre>• Updating prices whenever necessary.</pre>
<pre>• Indicating unavailable meals.</pre>
<pre>• Providing accurate descriptions and food images.</pre>
<pre>• Providing accurate descriptions and food images.</pre>
</span>

<pre className="font-extrabold text-red-600 w-auto max-w-98 m-2 text-xs text-wrap">FudStack is not responsible for inaccuracies submitted by the restaurant.</pre>

</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2">4. ORDER MANAGEMENT: {""}</pre> <br />

<pre className="font-semibold ml-2">The restaurant agrees to:</pre>

<span className="flex flex-col ml-2">
<pre>• Review incoming orders promptly.</pre>
<pre>• Accept or decline orders within a reasonable time.</pre>
<pre>• Prepare food according to the customer&apos;s request.</pre>
<pre>• Notify customers of unexpected delays whenever possible.</pre>
</span>

<pre className="font-extrabold text-red-600 w-auto max-w-98 m-2 text-xs text-wrap">Repeated failure to fulfill accepted orders may result in temporary suspension or permanent removal from the platform.</pre>
</span>
<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2 ">5. FOOD QUALITY: {""}</pre> <br />

<pre className="font-semibold ml-2">The restaurant remains fully responsible for:</pre>

<span className="flex flex-col m-2">  
<pre>• Food quality.</pre>
<pre>• Hygiene.</pre>
<pre>• Packaging.</pre>
<pre>• Portion sizes.</pre>
<pre>• Food safety.</pre>
</span>

<pre className="font-extrabold text-red-600 w-auto max-w-98 m-2 text-xs text-wrap">
  
FudStack does not prepare, package, or inspect meals and accepts no responsibility for food quality.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2">6. CUSTOMER COMMUNICATION: {""}</pre> <br />

<pre className="font-semibold w-auto max-w-98 ml-2 text-xs text-wrap"> 
Restaurants may communicate with customers only through approved communication channels provided by the platform.
</pre> <br />
<pre className="text-red-600 font-extrabold w-auto max-w-98 m-2 text-xs text-wrap">
  Abusive, threatening, discriminatory, or fraudulent communication is strictly prohibited.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold "> 7. PAYMENTS: {""}</pre> <br />
<pre className="font-semibold w-auto max-w-98 ml-2 text-xs text-wrap">
Where payments are processed through FudStack:
</pre> <br />
<span className="flex flex-col w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="w-auto max-w-98 ml-2 text-xs text-wrap">• Funds shall be transferred according to the agreed settlement schedule.</pre>
  <pre className="w-auto max-w-98 ml-2 text-xs text-wrap">• Platform commissions or service fees may be deducted before settlement.</pre>
  <pre className="w-auto max-w-98 ml-2 text-xs text-wrap">• Restaurants remain responsible for taxes applicable to their business</pre>
</span>
<pre className="text-red-600 font-extrabold w-auto max-w-98 ml-2 text-xs text-wrap">  
Where payments are handled directly by the restaurant, FudStack shall not be liable for payment disputes.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2"> 8. PLATFORM FEES: {""}</pre> <br />
<pre className="font-semibold w-auto max-w-98 ml-2 text-xs text-wrap">
FudStack reserves the right to introduce, modify, or remove subscription fees, commissions, or service charges with reasonable prior notice.
</pre> <br />
<pre className="w-auto max-w-98 ml-2 text-xs text-wrap">Continued use of the platform constitutes acceptance of updated pricing.</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold "> 9. DATA PRIVACY: {""}</pre> <br />
<pre className="font-semibold w-auto max-w-98 ml-2 text-xs text-wrap">
Restaurants shall only use customer information for fulfilling legitimate orders placed through the platform.
</pre> <br />
<pre className="font-semibold ml-2">
Customer information must never be:
</pre> <br />
<span className="flex-col flex">
<pre className="w-auto max-w-98 ml-2 text-xs text-wrap">• Sold.</pre>
<pre className="w-auto max-w-98 ml-2 text-xs text-wrap">• Shared with unauthorized third parties.</pre>
<pre className="w-auto max-w-98 ml-2 text-xs text-wrap">• Used for spam or unsolicited marketing.</pre>
</span>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold "> 
10. PROHIBITED ACTIVITIES: {""}</pre> <br />
<pre className="font-semibold ml-2">
Restaurants shall not:
</pre> <br />
<span className="flex-col flex m-2">
<pre>• Submit fake orders.</pre>
<pre>• Manipulate reviews.</pre>
<pre>• Misrepresent menu items.</pre>
<pre>• Upload copyrighted material without permission.</pre>
<pre>• Engage in fraudulent activities.</pre>
<pre>• Attempt to interfere with platform operations.</pre>
</span>
<pre className="ml-2">
  Violation of these terms may result in immediate suspension.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2">
11. INTELLECTUAL PROPERTY: {""}</pre> <br />
<pre className="font-semibold ml-2 w-auto max-w-98  text-xs text-wrap">
The restaurant retains ownership of its logos, menus, photographs, and branding.
</pre> <br />
<pre className="ml-2 w-auto max-w-98 text-xs text-wrap">
By uploading such content, the restaurant grants FudStack permission to display and promote the restaurant on the platform for operational and marketing purposes.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2 ">
12. ACCOUNT SUSPENSION: {""}</pre> <br />
<pre className="font-semibold w-auto max-w-98 ml-2 text-xs text-wrap">
FudStack reserves the right to suspend or terminate restaurant accounts that:

</pre> <br />
<span className="flex flex-col m-2">
  <pre>• Repeatedly violate platform policies.</pre>
  <pre>• Receive excessive verified complaints.</pre>
  <pre>• Engage in fraudulent behavior.</pre>
  <pre>• Breach applicable laws.</pre>
</span>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ">
13. LIMITATION OF LIABILITY: {""}</pre> <br />
<pre className="font-semibold w-auto max-w-98 ml-2 text-xs text-wrap">
FudStack provides software and communication infrastructure connecting restaurants and customers.
</pre> <br />
<pre className="font-semibold ml-2">
FudStack shall not be liable for:
</pre> <br />
<span className="flex flex-col m-2">
  <pre>• Loss of profits.</pre>
  <pre>• Food preparation errors.</pre>
  <pre>• Delivery issues caused by third parties.</pre>
  <pre>• Customer misuse of products.</pre>
  <pre>• Events beyond reasonable control.</pre>
</span>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2 ">
14. MODIFICATIONS: {""}</pre> <br />
<pre className="font-semibold ml-2">
FudStack may update these Terms from time to time.
</pre> <br />
<pre className="ml-2 w-auto max-w-98  text-xs text-wrap">

Restaurants will be notified of significant changes where appropriate.
</pre> <br />
<pre className="font-bold w-auto max-w-98 ml-2 text-xs text-wrap">


Continued use of the platform constitutes acceptance of the updated Agreement.
</pre>
</span>



<span className="w-auto max-w-98 m-2 text-xs text-wrap">
  <pre className="font-bold ml-2 ">
15. GOVERNING LAW: {""}</pre> <br />
<pre className="w-auto max-w-98 ml-2 text-xs text-wrap">
This Agreement shall be governed by the applicable laws of the country in which FudStack operates unless otherwise specified.
</pre>
</span>

<span className="w-auto max-w-98 m-2 text-xs text-wrap" id="bottom">
  <pre className="font-bold ml-2 ">
16. ACCEPTANCE: {""}</pre> <br />
<pre className="w-auto max-w-98 ml-2 text-xs text-wrap">
By selecting &quot;I Agree&quot;, the restaurant confirms that it has read, understood, and agrees to comply with this Restaurant Partner Agreement and all applicable platform policies.
</pre>
</span>
</span>
 <label htmlFor="restaurantAgreeTerms" className="text-sm tracking-tighter font-semibold m-4">
    <input
      type="checkbox"
      id="restaurantAgreeTerms"
      name="restaurantAgreeTerms"
      required
      className="p-2 "
    />
   <span className="ml-1">I have read and agree to the Terms and Conditions.</span>
  </label>
      </div>
      </div>
   </section>
   </>
  )       
}
export default AgentTerms