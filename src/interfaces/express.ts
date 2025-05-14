import { Request } from "express";

import { User } from "../models/user.model";

export type AuthenticatedUser = Pick<User, "id">;

export type ExtendedRequest = Request & { id: string } & { user?: AuthenticatedUser };

export interface AppSession {
  user: AuthenticatedUser;
}
