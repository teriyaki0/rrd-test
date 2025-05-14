enum REQUEST {
  REQUEST_RECEIVED = "Request received",
  REQUEST_COMPLETED = "Request completed",
}

enum SOCKET {
  CONNECTED = "Socket connected",
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
  SOCKET,
};
