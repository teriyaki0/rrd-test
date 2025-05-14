import { NextFunction, Response } from "express";

import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { SUCCESS } from "../constants/messages/success-messages.const";
import { ExtendedRequest } from "../interfaces/express";
import { logger } from "../libs/logger";

export function requestLogging(req: ExtendedRequest, res: Response, next: NextFunction) {
  const start = Date.now();

  try {
    logger.info({ reqId: req.id, method: req.method, url: req.url }, SUCCESS.REQUEST.REQUEST_RECEIVED);

    res.on("finish", () => {
      const responseTime = Date.now() - start;
      logger.info({ reqId: req.id, method: req.method, url: req.url, responseTime }, SUCCESS.REQUEST.REQUEST_COMPLETED);
    });

    next();
  } catch (error) {
    logger.error({ reqId: req.id, error: error.message, date: start }, ERROR_MESSAGE.COMMON.REQUEST_FAILED);
    next(error);
  }
}
