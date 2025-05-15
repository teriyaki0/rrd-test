import { Session } from "express-session";

import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { logger } from "../libs/logger";

export const saveSession = (session: Session): Promise<void> => {
  return new Promise((resolve, reject) => {
    session.save((err) => {
      if (err) {
        logger.error(ERROR_MESSAGE.CACHE.SESSION_SAVE_ERROR, err);
        return reject(err);
      }
      resolve();
    });
  });
};
