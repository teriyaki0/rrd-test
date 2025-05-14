import { CACHE_KEYS_PREFIX } from "../constants/cache-keys-prefix.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { SUCCESS } from "../constants/messages/success-messages.const";
import { logger } from "../libs/logger";
import { redisClient } from "../libs/redis";

export const setCache = async <T>(prefix: CACHE_KEYS_PREFIX, id: number, value: T, expirationInSeconds: number) => {
  const stringValue = JSON.stringify(value);
  const cacheKey = `${prefix}:${id}`;

  try {
    await redisClient.set(cacheKey, stringValue, "EX", expirationInSeconds);
    logger.info({ msg: SUCCESS.CACHE.SET, key: cacheKey, ttl: expirationInSeconds, size: stringValue.length });
  } catch (error) {
    logger.error({ msg: ERROR_MESSAGE.CACHE.SET, key: cacheKey, error });
    throw error;
  }
};

export const getCache = async (prefix: CACHE_KEYS_PREFIX, id: number) => {
  const cacheKey = `${prefix}:${id}`;

  try {
    const data = await redisClient.get(cacheKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    logger.error({ msg: ERROR_MESSAGE.CACHE.GET, key: cacheKey, error });
    throw error;
  }
};

export const deleteCache = async (prefix: CACHE_KEYS_PREFIX, id: number) => {
  const cacheKey = `${prefix}:${id}`;

  try {
    await redisClient.del(cacheKey);
    logger.info({ msg: SUCCESS.CACHE.DELETE, key: cacheKey });
  } catch (error) {
    logger.error({ msg: ERROR_MESSAGE.CACHE.DELETE, key: cacheKey, error });
    throw error;
  }
};
