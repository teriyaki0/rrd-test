import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { RATE_LIMIT_PRESET } from "../../constants/rate-limit-preset.const";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { rateLimiter } from "../../middleware/rate-limiter";
import { validate } from "../../middleware/validate";
import { saveSession } from "../../utils/saveSession";
import { spinInputSchema } from "./inputs/spin.input";

export const makeSuperRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post("/spin", rateLimiter(RATE_LIMIT_PRESET.GAME_SPIN), validate({ body: spinInputSchema }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.superService.spin({
        tgId: req.user.tgId,
        combination: req.body.combination,
        mode: req.body.mode,
        superGame: req.session.superGame,
        doubleGameActive:  req.session.doubleGame?.active ?? false,
      });

      req.session.superGame = {
        mode: req.body.mode,
        elements: result.elements,
        winAmount: result.winAmount,
        combination: result.results,
        beSecondChance: result.beSecondChance,
        carding: result.cards > 0 ? true : false
      };

      await saveSession(req.session);

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get("/cards", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.superService.getCards({ tgId: req.user.tgId });
      req.session.superGame.winAmount = result.winAmount;

      saveSession(req.session);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
