"use client"
interface Props{
  step : number
//   setStep:React.Dispatch<SetStateAction<boolean>> 
}
export default function ThreeDotHorizontal({step}:Props) {
  return (
    <div className='flex gap-3'>
     <span className={`w-2 h-2 ring ring-black/50 rounded-full transition-colors ease-in-out duration-75 ${step === 1 ? " animate-caret-blink bg-brand-burn ring-0" : "bg-primary-bone"}`}/>
     <span className={`w-2 h-2 ring ring-black/50 rounded-full transition-colors ease-in-out duration-75 ${step === 2 ? "bg-brand-burn ring-0 animate-caret-blink" : "bg-primary-bone"}`}/>
     <span className={`w-2 h-2 ring ring-black/50 rounded-full transition-colors ease-in-out duration-75 ${step === 3 ? "bg-brand-burn right-0" : "bg-primary-bone"}`}/>
    </div>
  );
}
