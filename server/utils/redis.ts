import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const getProductsFromDB = async (): Promise<Product[]> => {
  try {
    return (await redis.get<Product[]>("PRODUCTS")) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addProductsToDB = async (products: Product[]): Promise<void> => {
  try {
    await redis.set("PRODUCTS", JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

export const getAdminCredentialsFromDB =
  async (): Promise<AdminCredentials | null> => {
    try {
      const adminCredentials =
        await redis.get<AdminCredentials>("PRODUCTS_ADMIN");
      return adminCredentials;
    } catch (error) {
      console.log(error);
      throw new Error("Can't get admin credentials");
    }
  };
