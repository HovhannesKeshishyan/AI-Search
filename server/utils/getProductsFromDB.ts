import { redis } from "~~/server/utils/redis";
import type { Product } from "~~/shared/types/product";

export const getProductsFromDB = async (): Promise<Product[]> => {
  try {
    return (await redis.get<Product[]>("PRODUCTS")) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
