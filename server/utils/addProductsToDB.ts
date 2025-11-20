import { redis } from "~~/server/utils/redis";
import type { Product } from "~~/shared/types/product";

export const addProductsToDB = async (products: Product[]): Promise<void> => {
  try {
    await redis.set("PRODUCTS", JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};
