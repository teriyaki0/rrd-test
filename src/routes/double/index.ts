import express, { NextFunction, Response } from "express";

import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { validate } from "../../middleware/validate";
import { startDoubleInputScheme } from "./inputs/start.input";

export const makeDoubleRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.get("/start/:mode", validate({ params: startDoubleInputScheme }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.doubleService.start({ tgId: req.user.id, mode: req.params.mode, appSession: req.session });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get("/cashout", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.doubleService.cashOut({ tgId: req.user.id, doubleGame: req.session.doubleGame });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get("/half", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.doubleService.half({ tgId: req.user.id, doubleGame: req.session.doubleGame });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
