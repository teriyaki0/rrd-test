enum COMMON {
  INTERNAL_SERVER_ERROR = "Something went wrong on the server.",
  HANDLED_ERROR = "Handled error.",
  REQUEST_FAILED = "Request failed.",
  FORBIDDEN = "Forbidden.",
  VALIDATION_ERROR = "Validation failed.",
  EVERY_FIELD_REQUIRED = "Every field is required.",
  INVALID_TIME_FORMAT = "Invalid time format.",
  TOO_MANY_REQUESTS = "Too many requests.",
  RATE_LIMITER_ERROR = "Rate limiter error.",
}

enum SOCKET {
  SOCKET_ERROR = "Socket connection error.",
  DISCONNECTED = "Socket disconnected.",
}

enum CONFIG_ERROR {
  NODE_ENV_REQUIRED = "NODE_ENV must be specified. Expected values: development, production, test.",
  NODE_ENV_INVALID = "Unsupported NODE_ENV value. Expected: development, production, test.",
}

enum AUTH {
  UNAUTHORIZED = "Unauthorized.",
  LOGIN_ERROR = "User or password is incorrect.",
  REGISTER_ERROR = "User with this email already exists.",
  EMAIL_FIELD_UNIQUE = "email should be a unique field.",
  USER_ALREADY_REGISTERED = "User already registered.",
}

enum USER {
  USER_NOT_FOUND = "A user with the provided ID is not found.",
}

enum GAME {
  GAME_NOT_FOUND = "A game with the provided ID is not found.",
  BALANCE_NOT_ENOUGH = "Balance not enough.",
  DOUBLE_GAME_ACTIVE = "Double game active.",
  DOUBLE_GAME_ERROR = "Double game error.",
}

enum SUPER {
  CARDS_NOT_ENOUGH = "Cards not enough.",
}

enum CONVERT {
  PARAMS_FROM_TO_DIFFERENT = "Params from to different",
  CONVERSION_NOT_ENOUGH = "Conversion not enough",
}

enum CACHE {
  CONNECTION_ERROR = "Connection error.",

  SESSION_SAVE_ERROR = "Session save error.",
  SESSION_NOT_FOUND = "Session not found.",

  SET = "Cache set error.",
  GET = "Cache get error.",
  DELETE = "Cache delete error.",
}

export const ERROR_MESSAGE = {
  COMMON,
  CONFIG_ERROR,
  AUTH,
  USER,
  CACHE,
  CONVERT,
  GAME,
  SOCKET,
  SUPER,
};
