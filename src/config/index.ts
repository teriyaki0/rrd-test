import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { validatedEnv } from "./env.scheme";

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export interface Config {
  app: {
    host: string;
    port: number;
  };
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
  };
  telegram: {
    botToken: string;
  };
  security: {
    auth: {
      secret: string;
      expiresIn: string;
    };
    session: {
      secret: string;
      maxAge: string;
    };
    crypto: {
      salt: number;
    };
  };
  urls: {
    client: string;
    server: string;
  };
  logging: {
    level: LogLevel;
  };
}

const configs: {
  development: Config;
} = {
  development: {
    app: {
      host: validatedEnv.HOST,
      port: validatedEnv.PORT,
    },
    db: {
      host: validatedEnv.DB_HOST,
      port: validatedEnv.DB_PORT,
      username: validatedEnv.DB_USERNAME,
      password: validatedEnv.DB_PASSWORD,
      database: validatedEnv.DB_DATABASE,
    },
    redis: {
      host: validatedEnv.REDIS_HOST,
      port: validatedEnv.REDIS_PORT,
    },
    telegram: {
      botToken: validatedEnv.TELEGRAM_BOT_TOKEN,
    },
    security: {
      auth: {
        secret: validatedEnv.JWT_SECRET,
        expiresIn: validatedEnv.JWT_EXPIRES_IN,
      },
      session: {
        secret: validatedEnv.SESSION_SECRET,
        maxAge: validatedEnv.SESSION_MAX_AGE,
      },
      crypto: {
        salt: validatedEnv.SALT,
      },
    },
    urls: {
      client: validatedEnv.CLIENT_URL,
      server: validatedEnv.WEBHOOK_URL,
    },
    logging: {
      level: validatedEnv.LOG_LEVEL,
    },
  },
};

const getConfig = (): Config => {
  if (!process.env.NODE_ENV) {
    throw new Error(ERROR_MESSAGE.CONFIG_ERROR.NODE_ENV_REQUIRED);
  }

  const env = process.env.NODE_ENV as "development";

  if (!configs[env]) {
    throw new Error(ERROR_MESSAGE.CONFIG_ERROR.NODE_ENV_INVALID);
  }

  return configs[env];
};

export const config = getConfig();
