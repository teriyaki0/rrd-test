import express, { NextFunction, Response } from "express";

import { HTTP_STATUS_CODE } from "../../constants/http-status-code.enum";
import { RATE_LIMIT_PRESET } from "../../constants/rate-limit-preset.const";
import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { initializeSession } from "../../middleware/initializeSession";
import { rateLimiter } from "../../middleware/rate-limiter";
import { validate } from "../../middleware/validate";
import { signInInputScheme } from "./inputs/sign-in.input";

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post("/sign-in", initializeSession, rateLimiter(RATE_LIMIT_PRESET.AUTH), validate({ body: signInInputScheme }), async (req: ExtendedRequest, res: Response, next: NextFunction) => {
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
