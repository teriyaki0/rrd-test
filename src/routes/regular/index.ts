import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { validate } from "../../middleware/validate";
import { spinInputSchema } from "./inputs/spin.input";

export const makeRegularRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post("/spin", validate({ body: spinInputSchema }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      res.status(HTTP_STATUS_CODE.OK).json({});
    } catch (error) {
      next(error);
    }
  });

  return router;
};
