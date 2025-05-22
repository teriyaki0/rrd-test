import * as dotenv from "dotenv";
import { z } from "zod";

import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),

  HOST: z.string(),
  PORT: z.coerce.number(),

  TELEGRAM_BOT_TOKEN: z.string(),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),

  SALT: z.coerce.number(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  SESSION_SECRET: z.string(),
  SESSION_MAX_AGE: z.string(),

  CLIENT_URL: z.string(),
  WEBHOOK_URL: z.string(),

  RTP: z.coerce.number()
});

let validatedEnv: z.infer<typeof envSchema>;

try {
  validatedEnv = envSchema.parse(process.env);
} catch (err) {
  console.error({
    msg: ERROR_MESSAGE.COMMON.VALIDATION_ERROR,
    error: err,
    receivedEnv: process.env,
  });

  process.exit(1);
}

export { validatedEnv };
