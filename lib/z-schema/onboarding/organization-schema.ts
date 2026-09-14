import {z} from "zod"
export const createOrganizationSchema = z.object({
 state: z.string().trim().min(3, "Name of state must be at least 3 characters"),
 address: z.string().trim().min(5, "Addresses must be at least 5 characters long"),
 city: z.string().trim().min(3, "Name of city must be at least 3 characters"),
 // openHours Later;
});

