import jwt from "jsonwebtoken";

import { config } from "../config";
import { UserRole } from "../models/user.model";

export const singJWT = (id: number, role: UserRole) => {
  return jwt.sign({ id, role }, config.security.auth.secret, { expiresIn: config.security.auth.expiresIn });
};
