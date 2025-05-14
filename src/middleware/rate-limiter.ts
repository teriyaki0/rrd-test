import rateLimit from "express-rate-limit";

export function rateLimiter(ms: number) {
  return rateLimit({
    windowMs: ms,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
}
