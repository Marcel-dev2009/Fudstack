"use server";
import { updateTag } from "next/cache";
import { prisma } from "../auth";
import { getOrganization } from "./getOrganization";
import { getUserSession } from "./getSession";
export interface LocationUpdates {
  city: string;
  state: string;
  address: string;
}

export interface RestaurantUpdates {
  name?: string;
  staffNos?: number;
  location?: LocationUpdates;
}

interface ResponseObject {
  success: boolean;
  message: string;
}

const ALLOWED_RESTAURANT_FIELDS = [
  "name",
  "staffNos",
  "location",
] as const;

export type updateTableField =
  (typeof ALLOWED_RESTAURANT_FIELDS)[number];

export async function updateRestaurantData(
  restaurantId:string,
  fieldsToUpdate: RestaurantUpdates
): Promise<ResponseObject> {
  const keysToUpdate = Object.keys(fieldsToUpdate);

  const isValid = keysToUpdate.every((key) =>
    (ALLOWED_RESTAURANT_FIELDS as readonly string[]).includes(key)
  );

  if (!isValid || keysToUpdate.length === 0) {
    throw new Error("Unauthorized or invalid field update");
  }

  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized: Session not found",
      };
    }

    const organization = await getOrganization(session.user.id);

    if (!organization) {
      return {
        success: false,
        message: "Organization not found",
      };
    }
    const { location, ...restaurantFields } = fieldsToUpdate;
   const restaurant = await prisma.restaurant.findFirst({
    where:{
      id:restaurantId
    },
    select:{
      id:true
    }
   })
   if(!restaurant){
    return{
      success:false,
      message:"Unauthorized restaurant not found"
    }
   }
    await prisma.restaurant.update({
      where: {
        id:restaurant.id
      },

      data: {
        ...restaurantFields,

        ...(location && {
          location: {
            update: {
              city:location.city,
              state:location.state,
              address:location.address,
            },
          },
        }),
      },
    });

    updateTag(`organization-restaurant:${organization.id}`);

    return {
      success: true,
      message: "Updated successfully!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Error updating field: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}