import bcrypt from "bcrypt";

import { config } from "../config";

export const hash = (text: string): Promise<string> => {
  return bcrypt.hash(text, config.security.crypto.salt);
};

export const compare = (text: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(text, hashed);
};
