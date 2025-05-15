import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { AppSession } from "../interfaces/express";
import { sessionMiddleware } from "./session";

export const socketSessionMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  sessionMiddleware(socket.request as any, {} as any, (err) => {
    if (err) return next(err);

    const session = (socket.request as any).session as AppSession;
    if (!session) {
      return next(new Error(ERROR_MESSAGE.CACHE.SESSION_NOT_FOUND));
    }

    next();
  });
};
