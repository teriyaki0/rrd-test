import { NextFunction, Request, Response } from "express";
import { IRateLimiterOptions } from "rate-limiter-flexible";

import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { RATE_LIMIT_PRESET, rateLimitPresets } from "../constants/rate-limit-preset.const";
import { checkRateLimit } from "../utils/rateLimiter";

export function rateLimiter(preset: RATE_LIMIT_PRESET | Partial<IRateLimiterOptions> = RATE_LIMIT_PRESET.GENERAL) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let options: Partial<IRateLimiterOptions>;

    if (typeof preset === "string") {
      options = rateLimitPresets[preset] || rateLimitPresets[RATE_LIMIT_PRESET.GENERAL];
    } else {
      options = preset;
    }

    const id = req.ip || (req.headers["x-forwarded-for"] as string) || "unknown";

    const limiterKey = `http:${req.method}:${req.path}`;

    try {
      const result = await checkRateLimit(limiterKey, id, options);

      res.setHeader("X-RateLimit-Limit", options.points || 100);
      res.setHeader("X-RateLimit-Remaining", result.remainingPoints);
      res.setHeader("X-RateLimit-Reset", new Date(Date.now() + result.msBeforeNext).toISOString());

      if (!result.allowed) {
        return res.status(HTTP_STATUS_CODE.TOO_MANY_REQUESTS).json({
          error: ERROR_MESSAGE.COMMON.TOO_MANY_REQUESTS,
          retryAfter: Math.ceil(result.msBeforeNext / 1000),
        });
      }

      next();
    } catch (error) {
      next();
    }
  };
}
