import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { validate } from "../../middleware/validate";
import { saveSession } from "../../utils/saveSession";
import { startDoubleInputScheme } from "./inputs/start.input";

export const makeDoubleRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.get("/start/:mode", validate({ params: startDoubleInputScheme }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.doubleService.start({ tgId: req.user.id, mode: req.params.mode, appSession: req.session });

      req.session.doubleGame = result.doubleGame;

      saveSession(req.session);

      const { doubleGame, ...responseData } = result;

      res.status(HTTP_STATUS_CODE.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  });

  router.get("/cashout", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.doubleService.cashOut({ tgId: req.user.id, doubleGame: req.session.doubleGame });

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get("/half", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.doubleService.half({ tgId: req.user.id, doubleGame: req.session.doubleGame });
      req.session.doubleGame = result.doubleGame;

      saveSession(req.session);

      const { doubleGame, ...responseData } = result;

      res.status(HTTP_STATUS_CODE.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
