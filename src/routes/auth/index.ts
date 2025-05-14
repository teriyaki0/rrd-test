import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { validate } from "../../middleware/validate";
import { loginInputScheme } from "./inputs/login.input";

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post("/login", validate({ body: loginInputScheme }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.authService.login(req.body.initData);
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
