import { createAdapter } from "@socket.io/redis-adapter";
import { Server } from "socket.io";

import { config } from "../config";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { SUCCESS } from "../constants/messages/success-messages.const";
import { SocketLoader } from "../interfaces/general";
import { logger } from "../libs/logger";
import { redisClient } from "../libs/redis";
import { sessionMiddleware } from "../middleware/session";
import { socketAuth } from "../middleware/socketAuth";

export const loadSocket: SocketLoader = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: config.urls.client,
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
  });

  io.adapter(createAdapter(redisClient, redisClient.duplicate()));

  io.engine.use(sessionMiddleware);

  io.use((socket, next) => {
    sessionMiddleware(socket.request as any, {} as any, next as any);
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    const session = (socket.request as any).session;

    logger.info({ msg: SUCCESS.SOCKET.CONNECTED, sessionId: session.id, userId: session.user.id });

    socket.on("error", (err) => {
      logger.error({ msg: ERROR_MESSAGE.SOCKET.SOCKET_ERROR, error: err });
    });

    socket.on("disconnect", () => {
      console.log(ERROR_MESSAGE.SOCKET.DISCONNECTED, socket.id);
    });

    socket.on("double", async () => {});
  });
};
