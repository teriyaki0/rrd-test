import { IRateLimiterOptions } from "rate-limiter-flexible";

export enum RATE_LIMIT_PRESET {
  CONVERT = "api:convert",
  GENERAL = "http:general",
  AUTH = "http:auth",
  GAME_DOUBLE = "game:double",
  GAME_SPIN = "game:spin",
}

export const rateLimitPresets: Record<string, Partial<IRateLimiterOptions>> = {
  "http:general": {
    points: 100,
    duration: 60,
  },

  "http:auth": {
    points: 3,
    duration: 60,
  },

  "api:convert": {
    points: 10,
    duration: 600,
  },

  "game:double": {
    points: 5,
    duration: 10,
  },

  "game:spin": {
    points: 15,
    duration: 5,
  },
};
