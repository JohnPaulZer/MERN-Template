import { rateLimit } from "express-rate-limit";

const toMs = (minutes: number) => minutes * 60 * 1000;

// Global limiter
export const globalRateLimiter = rateLimit({
  windowMs: toMs(Number(process.env.GLOBAL_RATE_LIMIT_MINUTES) || 15),
  max: Number(process.env.GLOBAL_RATE_LIMIT_MAX) || 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
