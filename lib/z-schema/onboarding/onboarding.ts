import {z} from "zod";
import { createOrganizationSchema } from "./organization-schema";
import { createRestaurantSchema } from "./restaurant-schema";
import { setLocationSchema } from "./location-schema";
export const onboardingSchema = z.object({
 organization:createOrganizationSchema,
 restaurant:createRestaurantSchema,
 location:setLocationSchema         
})

export type onboardingInput = z.infer<typeof onboardingSchema>;