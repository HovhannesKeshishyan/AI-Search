import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export default defineNitroPlugin(async (nitroApp) => {
  if (redisClient) return;

  const config = useRuntimeConfig();

  const redisUrl = config.redisUrl;

  try {
    redisClient = createClient({ url: redisUrl });

    redisClient.on("error", (err) => console.error("Redis Client Error", err));

    await redisClient.connect();
    console.log("Successfully connected to Redis.");

    // Inject the client into the Nitro application context
    // This makes it available in your API routes and server middleware
    nitroApp.hooks.hook("request", (event) => {
      event.context.redis = redisClient;
    });

  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
});

// You might also want to export a utility to access the client outside of hooks
// export function useRedisClient() {
//   if (!redisClient) {
//     throw new Error('Redis client not initialized');
//   }
//   return redisClient;
// }