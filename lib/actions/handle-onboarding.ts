"use server";

import { z } from "zod";
import { onboardingInput, onboardingSchema } from "../z-schema/onboarding/onboarding";
import { prisma } from "../auth";

export const handleOnboarding = async (
  userId: string,
  rawData: onboardingInput
) => {
  // 1. Input Validation
  const validatedInput = onboardingSchema.safeParse(rawData);
  if (!validatedInput.success) {
    const { fieldErrors } = z.flattenError(validatedInput.error);
    return {
      success: false,
      message: "data validation failed",
      errors: fieldErrors,
    };
  }

  const { organization: orgData, restaurant: resData, location: locData } = validatedInput.data;

  try {
    console.log("Prisma transaction starting!!");

    // REMOVED 'return' from here. We assign it to a variable instead.
    await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: orgData.name,
          logoUrl: orgData.logoUrl,
          resNos: orgData.resNos,
          description: orgData.description,
          ownerId: userId
        } 
      });

      const restaurant = await tx.restaurant.create({
        data: {
          name: resData.name,
          logoUrl: resData.logoUrl,
          phone: resData.phone,
          email: resData.email,
          staffNos: resData.staffNos,
          organizationId: organization.id,
        }
      });

      await tx.location.create({
        data: {
          state: locData.state,
          address: locData.address,
          city: locData.city,
          restaurantId: restaurant.id
        }
      });
    });

    console.log("Prisma transaction committed successfully!");
    
    // 2. Explicitly return a success payload back to the client
    return {
      success: true,
      message: "Onboarding completed successfully"
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Prisma transaction failed";
    console.error("❌ Transaction Error Logged:", errorMessage);   
    
    // 3. Ensure the client receives a structured failure object instead of undefined
    return {
      success: false,
      message: errorMessage
    };
  }
};
