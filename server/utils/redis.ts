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

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_SECONDS = 15 * 60;

const loginAttemptsKey = (identifier: string) =>
  `LOGIN_ATTEMPTS:${identifier}`;

export const getLoginAttempts = async (identifier: string): Promise<number> => {
  try {
    return (await redis.get<number>(loginAttemptsKey(identifier))) || 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const registerFailedLoginAttempt = async (
  identifier: string
): Promise<void> => {
  try {
    const key = loginAttemptsKey(identifier);
    const attempts = await redis.incr(key);
    if (attempts === 1) {
      await redis.expire(key, LOGIN_WINDOW_SECONDS);
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearLoginAttempts = async (identifier: string): Promise<void> => {
  try {
    await redis.del(loginAttemptsKey(identifier));
  } catch (error) {
    console.log(error);
  }
};

export const LOGIN_RATE_LIMIT = {
  maxAttempts: LOGIN_MAX_ATTEMPTS,
  windowSeconds: LOGIN_WINDOW_SECONDS,
};

export const getAdminCredentialsFromDB =
  async (): Promise<AdminCredentials | null> => {
    try {
      const adminCredentials =
        await redis.get<AdminCredentials>("PRODUCTS_ADMIN");
      return adminCredentials;
    } catch (error) {
      console.log(error);
      throw new Error("Can't get admin credentials", { cause: error });
    }
  };
