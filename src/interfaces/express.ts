import { Request } from "express";

import { User } from "../models/user.model";
import { DoubleGame } from "./sessions/double.session";
import { RegularGame } from "./sessions/regular.session";
import { SuperGame } from "./sessions/super.session";

export type AuthenticatedUser = Pick<User, "id">;

export interface AppSession {
  user: AuthenticatedUser;
  regularGame: RegularGame;
  superGame: SuperGame;
  doubleGame: DoubleGame;
}

export type ExtendedRequest = Request & { id: string } & { user: AuthenticatedUser } & { session: AppSession };
