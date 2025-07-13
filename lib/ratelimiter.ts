import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// More lenient rate limiter for general API usage
export const ratelimit = new Ratelimit({
   redis: Redis.fromEnv(),
   limiter: Ratelimit.slidingWindow(50, "60 s"), // 50 requests per minute
   analytics: true,
   timeout: 10000, // 10 seconds
});

// Stricter rate limiter for sensitive operations
export const strictRatelimit = new Ratelimit({
   redis: Redis.fromEnv(),
   limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per minute
   analytics: true,
   timeout: 10000, // 10 seconds
});