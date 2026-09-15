/* eslint-disable prefer-const */
import {z} from "zod";
const timeRegex = /^(0?[0-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
const convertTimetoDecimal = (timeStr:string):number => {
 const [time , modifer] = timeStr.trim().split(/\s*(AM|PM)/i);
 let [hours , minutes] = time.split(":").map(Number);
 if(modifer.toUpperCase() === "PM" && hours < 12 ) hours += 12;
 if(modifer.toUpperCase() === "AM" && hours === 12 ) hours = 0;
 return hours + minutes/60;
}
export const businessHourSchema = z.object({
 day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
openTime: z.string().regex(timeRegex, { message: "Invalid open time format (e.g., 8:00AM)" }),
closeTime: z.string().regex(timeRegex, { message: "Invalid close time format (e.g., 10:00PM)" }),
})
.superRefine((data , ctx) => {
 const open = convertTimetoDecimal(data.openTime);
 const close = convertTimetoDecimal(data.closeTime);
 if(close >= open){
   ctx.addIssue({
   code: "custom",      
   path:["closeTime"],
   message:"Closing time must be later than opening time",     
   })       
 }         
})
.transform((data) => {
  const open = convertTimetoDecimal(data.openTime);
 const close = convertTimetoDecimal(data.closeTime);
 return{
  ...data,
  activeHours: close - open        
 }         
})