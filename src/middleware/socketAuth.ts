import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

import { config } from "../config";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";

export const socketAuth = (socket: Socket, next: (err?: any) => void) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error(ERROR_MESSAGE.AUTH.UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, config.security.auth.secret);
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error(ERROR_MESSAGE.AUTH.UNAUTHORIZED));
  }
};
