import { redis } from "~~/server/utils/redis";
interface AdminCredentials {
    id: number;
    username: string;
    password: string;
    role: "ADMIN";
    name: string;
}

export const getAdminCredentialsFromDB = async (): Promise<AdminCredentials | null> => {
  try {
    const adminCredentials = await redis.get<AdminCredentials>("PRODUCTS_ADMIN");
    return adminCredentials;
  } catch (error) {
    console.log(error);
    throw new Error("Can't get admin credentials");
  }
};
