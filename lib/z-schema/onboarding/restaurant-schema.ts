import {z} from "zod"
export const createRestaurantSchema = z.object({
 name: z.string().trim().min(5 , "Restaurant name must be at least 5 characters"),
 logoUrl: z.string(),
 phone:z.string().trim().min(11 , "Phone numbers must be of 11 characters").regex( 
  /^0[789][01]\d{8}$/,
  "Invalid Nigerian phone number format (should start with 080, 081, 070, 090, etc.)" 
),
email: z.email(),
staffNos:z.number().min(1 , "At least a staff must be within the restaurant"),
})
export type restaurantInput = z.infer<typeof createRestaurantSchema>