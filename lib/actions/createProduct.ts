"use server";
import { updateTag } from "next/cache";
import { prisma } from "../auth";
import { getOrganization } from "./getOrganization";
import { getUserSession } from "./getSession";

interface CreateProductData {
  name: string;
  logoUrl: string;
  price: number;
  description: string;
  stockQuantity: number;
}

interface ResponseObject {
  success: boolean;
  message: string;
  product?: {
    id: string;
    name: string;
  };
}

export async function CreateProduct(
  restaurantId: string,
  data: CreateProductData
): Promise<ResponseObject> {
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

    // Make sure this restaurant actually belongs to the user's organization
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
        organizationId: organization.id,
      },
      select: {
        id: true,
      },
    });

    if (!restaurant) {
      return {
        success: false,
        message: "Restaurant not found or unauthorized",
      };
    }

    if (
      !data.name.trim() ||
      !data.description.trim() ||
      data.price < 0 ||
      data.stockQuantity < 0
    ) {
      return {
        success: false,
        message: "Invalid product data",
      };
    }

    const product = await prisma.product.create({
      data: {
        name: data.name.trim(),
        logoUrl: data.logoUrl,
        price: data.price,
        description: data.description.trim(),
        stockQuantity: data.stockQuantity,
        inStock: data.stockQuantity > 0,
        restaurantId: restaurant.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    updateTag(`restaurant-products:${restaurantId}`)
    return {
      success: true,
      message: "Product created successfully",
      product,
    };
  } catch (error) {
    console.error("CreateProduct error:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}