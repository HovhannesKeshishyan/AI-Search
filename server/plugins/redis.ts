import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig();

  // We register the hook IMMEDIATELY so no request slips through
  nitroApp.hooks.hook("request", async (event) => {
    // 1. Initialize client if it doesn't exist
    if (!redisClient) {
      redisClient = createClient({ url: config.redisUrl });
      redisClient.on("error", (err) =>
        console.error("Redis Client Error", err)
      );
    }

    // 2. Ensure connection is open before attaching
    if (!redisClient.isOpen) {
      try {
        // This ensures we don't try to connect multiple times in parallel
        // inside a single serverless instance
        await redisClient.connect();
        console.log("Connected to Redis");
      } catch (error) {
        console.error("Redis connection failed", error);
      }
    }

    // 3. Attach to context (Nitro waits for this async function to finish)
    event.context.redis = redisClient;
  });
});
