enum REQUEST {
  REQUEST_RECEIVED = "Request received",
  REQUEST_COMPLETED = "Request completed",
}

enum CACHE {
  REDIS_CONNECTED = "Redis connection established",

  SET = "Cache set successfully",
  GET = "Cache get successfully",
  DELETE = "Cache deleted successfully",
}

export const SUCCESS = {
  REQUEST,
  CACHE,
};
