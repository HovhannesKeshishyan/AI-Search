import type { H3Event } from "h3";
import type { Product } from "~~/shared/types/product";

const KEY = process.env.REDIS_DATA_KEY;

export const addProductsToDB = async (
  event: H3Event,
  products: Product[]
): Promise<void> => {
  try {
    const redis = event.context.redis;
    redis.set(KEY, JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};
