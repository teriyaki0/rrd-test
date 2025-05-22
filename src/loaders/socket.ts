import { Server } from "socket.io";

import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { SUCCESS } from "../constants/messages/success-messages.const";
import { SOCKET_HANDLES } from "../constants/socket-handles.enum";
import { SessionIncomingMessage } from "../interfaces/express";
import { SocketLoader } from "../interfaces/general";
import { logger } from "../libs/logger";
import { socketCors } from "../middleware/cors-settings";
import { sessionMiddleware } from "../middleware/session";
import { socketAuth } from "../middleware/socketAuth";
import { Game } from "../models/game.model";
import { User } from "../models/user.model";
import { saveSession } from "../utils/saveSession";
import { getSocketSession } from "../utils/socket";

export const loadSocket: SocketLoader = (httpServer, context) => {
  const io = new Server(httpServer, {
    path: "/rrd/socket.io",
    cors: socketCors,
    transports: ["websocket"],
  });

  io.use((socket, next) => {
    sessionMiddleware(socket.request as any, {} as any, next as any);
  });

  io.use(socketAuth);

  io.on(SOCKET_HANDLES.COMMON.CONNECTION, (socket) => {
    const tgId = socket.data.user?.tgId;
    logger.info({
      msg: SUCCESS.SOCKET.CONNECTED,
      sessionId: getSocketSession(socket).id,
    });

    socket.on('sendPing', () => {
      socket.emit('ping', 'pong');
    });

    socket.on(SOCKET_HANDLES.DOUBLE.DOUBLE, async () => {
      const request = socket.request as SessionIncomingMessage;

      request.session.reload(async (err: any) => {
        if (err) {
          socket.emit(SOCKET_HANDLES.DOUBLE.ERROR, {
            code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: ERROR_MESSAGE.COMMON.INTERNAL_SERVER_ERROR,
          });
          return;
        }

        const session = getSocketSession(socket);

        try {
          const result = await context.services.doubleService.play({
            tgId,
            doubleGame: session.doubleGame,
          });

          session.doubleGame = result.doubleGame;
          saveSession(session);

          const { doubleGame, ...responseData } = result;

          socket.emit(SOCKET_HANDLES.DOUBLE.RESULT, responseData);
        } catch (error) {
          logger.error({
            msg: "[DOUBLE] Error during double game play",
            socketId: socket.id,
            userId: tgId,
            errorMessage: error?.message,
            errorStack: error?.stack,
            errorResponse: error?.response,
            errorCode: error?.code,
            fullError: error,
          });

          const game = await Game.findOne({
            include: [{ model: User, as: "user", where: { tgId }, attributes: [] }],
          });

          if (game) {
            game.winPoint = 0;
            await game.save();
            logger.warn({
              msg: "[DOUBLE] Game reset due to error",
              gameId: game.id,
              userId: tgId,
            });
          }

          session.doubleGame = {
            active: false,
            currentAttempts: 0,
            currentMultiplier: 1,
            canHalf: true,
            originalAmount: 0,
            initialWinPoint: 0,
          };

          saveSession(session);

          socket.emit(SOCKET_HANDLES.DOUBLE.ERROR, {
            code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: ERROR_MESSAGE.COMMON.INTERNAL_SERVER_ERROR,
          });
        }
      });
    });

    socket.on(SOCKET_HANDLES.COMMON.DISCONNECT, () => {
      console.log(ERROR_MESSAGE.SOCKET.DISCONNECTED, socket.id);
    });
  });
};
