import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { validate } from "../../middleware/validate";
import { signInInputScheme } from "./inputs/sign-in.input";

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post("/sign-in", validate({ body: signInInputScheme }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await context.services.authService.login(req.body.initData);

      res.cookie("token", result.token, {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
