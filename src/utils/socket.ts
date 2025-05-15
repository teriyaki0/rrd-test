import { Socket } from "socket.io";

import { AppSession } from "../interfaces/express";

export function getSocketSession(socket: Socket): AppSession {
  return (socket.request as any).session;
}

export function getSocketUser(socket: Socket) {
  const session = getSocketSession(socket);
  return session?.user;
}
