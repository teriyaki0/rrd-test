import jwt from "jsonwebtoken";

import { config } from "../config";

export const singJWT = (tgId: string) => {
  return jwt.sign({ tgId }, config.security.auth.secret, { expiresIn: config.security.auth.expiresIn });
};
