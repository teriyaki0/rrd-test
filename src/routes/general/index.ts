import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { RATE_LIMIT_PRESET } from "../../constants/rate-limit-preset.const";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { rateLimiter } from "../../middleware/rate-limiter";
import { validate } from "../../middleware/validate";
import { convertInputScheme } from "./inputs/convert.input";

export const makeGeneralRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.get("/init", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.generalService.init({ tgId: req.user.tgId });
      res.status(HTTP_STATUS_CODE.OK).json({ ...result, previousGame: req.session.regularGame.combination, previousSuperGame: req.session.superGame.combination, doubleActive: req.session.doubleGame.active });
    } catch (error) {
      next(error);
    }
  });

  router.post("/convert", validate({ body: convertInputScheme }), rateLimiter(RATE_LIMIT_PRESET.CONVERT), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.generalService.creditsTransfer({ tgId: req.user.tgId, ...req.body });
      res.status(HTTP_STATUS_CODE.OK).json({ result });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
