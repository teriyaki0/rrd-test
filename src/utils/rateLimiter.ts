import { IRateLimiterOptions, RateLimiterAbstract, RateLimiterRedis, RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { logger } from "../libs/logger";
import { redisClient } from "../libs/redis";

const defaultOptions: IRateLimiterOptions = {
  points: 10,
  duration: 60,
  blockDuration: 0,
};

const limitersCache: Map<string, RateLimiterAbstract> = new Map();

export function getRateLimiter(key: string, options: Partial<IRateLimiterOptions> = {}): RateLimiterAbstract {
  if (limitersCache.has(key)) {
    return limitersCache.get(key)!;
  }

  const mergedOptions: IRateLimiterOptions = {
    ...defaultOptions,
    ...options,
    keyPrefix: key,
  };

  let limiter: RateLimiterAbstract;

  const useRedis = typeof redisClient !== "undefined";

  if (useRedis) {
    limiter = new RateLimiterRedis({
      ...mergedOptions,
      storeClient: redisClient,
      insuranceLimiter: new RateLimiterMemory(mergedOptions),
    });
    logger.debug(`Created Redis rate limiter for key: ${key}`);
  } else {
    limiter = new RateLimiterMemory(mergedOptions);
    logger.debug(`Created Memory rate limiter for key: ${key}`);
  }

  limitersCache.set(key, limiter);
  return limiter;
}

export async function checkRateLimit(
  limiterKey: string,
  id: string,
  options: Partial<IRateLimiterOptions> = {},
): Promise<{ allowed: boolean; remainingPoints: number; msBeforeNext: number }> {
  const limiter = getRateLimiter(limiterKey, options);

  try {
    const rateLimiterRes = await limiter.consume(id);

    return {
      allowed: true,
      remainingPoints: rateLimiterRes.remainingPoints,
      msBeforeNext: rateLimiterRes.msBeforeNext,
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error({
        msg: ERROR_MESSAGE.COMMON.RATE_LIMITER_ERROR,
        error,
        limiterKey,
        id,
      });
      return { allowed: true, remainingPoints: 0, msBeforeNext: 0 };
    }

    const rateLimiterRes = error as RateLimiterRes;
    return {
      allowed: false,
      remainingPoints: rateLimiterRes.remainingPoints,
      msBeforeNext: rateLimiterRes.msBeforeNext,
    };
  }
}

export async function resetRateLimit(limiterKey: string, id: string): Promise<void> {
  if (limitersCache.has(limiterKey)) {
    const limiter = limitersCache.get(limiterKey)!;
    await limiter.delete(id);
    logger.debug(`Reset rate limit for ${limiterKey}:${id}`);
  }
}

