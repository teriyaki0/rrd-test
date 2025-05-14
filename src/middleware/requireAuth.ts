import { Response, NextFunction } from "express";

import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { ExtendedRequest } from "../interfaces/express";

export const requireAuth = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGE.AUTH.UNAUTHORIZED });
  }
  next();
};
