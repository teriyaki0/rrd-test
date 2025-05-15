import { Request } from "express";
import { Session } from "express-session";
import { IncomingMessage } from "http";

import { User } from "../models/user.model";
import { DoubleGame } from "./sessions/double.session";
import { RegularGame } from "./sessions/regular.session";
import { SuperGame } from "./sessions/super.session";

export type AuthenticatedUser = Pick<User, "id">;

export interface AppSession extends Session {
  user: AuthenticatedUser;
  regularGame: RegularGame;
  superGame: SuperGame;
  doubleGame: DoubleGame;
}

export interface SessionIncomingMessage extends IncomingMessage {
  session: AppSession;
}

export type ExtendedRequest = Request & { id: string } & { user: AuthenticatedUser } & { session: AppSession };
