import {z} from "zod"
export const createOrganizationSchema = z.object({
 name:z.string().trim().min(5, "Name should be at least 5 characters!"),
 logoUrl:z.string(),
 resNos:z.number().min(1, "At least one restaurant should be under this organization"),
 description:z.string().trim().min(10, "Description should be at least 10 characters")
});
export type organizationInput = z.infer<typeof createOrganizationSchema>
