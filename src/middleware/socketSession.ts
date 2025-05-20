import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { AppSession } from "../interfaces/express";
import { sessionMiddleware } from "./session";

export const socketSessionMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  sessionMiddleware(socket.request as any, {} as any, (err) => {
(socket, next) => {
      sessionMiddleware(socket.request as any, {} as any, next as any);
    }
  });
};
