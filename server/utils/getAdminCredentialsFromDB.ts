import type { H3Event } from "h3";

const KEY = "PRODUCTS_ADMIN";

interface AdminCredentials {
    id: number;
    username: string;
    password: string;
    role: "ADMIN";
    name: string;
}

export const getAdminCredentialsFromDB = async (event: H3Event): Promise<AdminCredentials> => {
  try {
    const redis = event.context.redis;
    const adminCredentials = await redis.get(KEY);
    return JSON.parse(adminCredentials);
  } catch (error) {
    console.log(error);
    throw new Error("Can't get admin credentials");
  }
};
