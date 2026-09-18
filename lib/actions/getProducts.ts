"use server";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../auth";

export async function getProducts(restaurantId: string) {
  "use cache";

  cacheTag(`restaurant-products:${restaurantId}`);
  cacheLife("max");

  return await prisma.product.findMany({
    where: {
      restaurantId,
    },
    select: {
      id: true,
      name: true,
      logoUrl: true,
      price: true,
      description: true,
      stockQuantity: true,
      inStock: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export type ProductItem = Awaited<ReturnType<typeof getProducts>>[number];