import type { H3Event } from "h3";
import type { Product } from "~~/shared/types/product";

const KEY = process.env.REDIS_DATA_KEY;

export const getProductsFromDB = async (event: H3Event): Promise<Product[]> => {
  let products: Product[] = [];
  try {
    const redis = event.context.redis;
    if (!redis) {
      console.log("event.context.redis is undefined");
      return [];
    }
    const productsFromDB = await redis.get(KEY);
    products = productsFromDB ? JSON.parse(productsFromDB) : [];
  } catch (error) {
    console.log(error);
  }
  return products;
};
