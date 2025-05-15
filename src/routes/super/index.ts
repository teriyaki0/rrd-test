import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { validate } from "../../middleware/validate";
import { saveSession } from "../../utils/saveSession";
import { spinInputSchema } from "./inputs/spin.input";

export const makeSuperRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post("/spin", validate({ body: spinInputSchema }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.superService.spin({
        tgId: req.user.id,
        ...req.body,
        superGame: req.session.superGame,
        doubleGameActive: req.session.doubleGame.active,
      });

      req.session.superGame = {
        mode: req.body.mode,
        elements: result.elements,
        winAmount: result.winAmount,
        combination: req.body.combination,
        beSecondChance: result.beSecondChance,
      };

      saveSession(req.session);

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  });

  router.get("/cards", async (req: any, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.superService.getCards({ tgId: req.user.id });
      req.session.superGame.winAmount = result.winAmount;

      saveSession(req.session);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
