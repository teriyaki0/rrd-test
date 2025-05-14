import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { rateLimiter } from "../../middleware/rate-limiter";
import { validate } from "../../middleware/validate";
import { getExpiration } from "../../utils/getExpiration";
import { convertInputScheme } from "./inputs/convert.input";

export const makeGeneralRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.get("/init", async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.generalService.init({ tgId: req.user.id });
      res.status(HTTP_STATUS_CODE.OK).json({ result });
    } catch (error) {
      next(error);
    }
  });

  router.post("/convert", validate({ body: convertInputScheme }), rateLimiter(getExpiration("10m")), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.generalService.creditsTransfer({ tgId: req.user.id, ...req.body });
      res.status(HTTP_STATUS_CODE.OK).json({ result });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
