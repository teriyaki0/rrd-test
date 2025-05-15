import { RedisStore } from "connect-redis";
import session from "express-session";

import { config } from "../config";
import { CACHE_KEYS_PREFIX } from "../constants/cache-keys-prefix.enum";
import { redisClient } from "../libs/redis";
import { getExpiration } from "../utils/getExpiration";

export const sessionMiddleware = session({
  secret: config.security.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: getExpiration(config.security.session.maxAge),
  },
  store: new RedisStore({ client: redisClient, prefix: CACHE_KEYS_PREFIX.SESSION }),
});
