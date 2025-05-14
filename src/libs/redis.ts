import Redis from "ioredis";

import { config } from "../config";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { SUCCESS } from "../constants/messages/success-messages.const";
import { logger } from "./logger";

export const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

redisClient.on("connect", () => {
  logger.info({
    msg: SUCCESS.CACHE.REDIS_CONNECTED,
  });
});

redisClient.on("error", (err) => {
  logger.error({ msg: ERROR_MESSAGE.CACHE.CONNECTION_ERROR, error: err });
});
