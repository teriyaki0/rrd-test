import express, { NextFunction, Response } from "express";

import { ExtendedRequest } from "../../interfaces/express";
import { Context, RouterFactory } from "../../interfaces/general";
import { requireAuth } from "../../middleware/requireAuth";

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.get("/init", requireAuth, async (req: ExtendedRequest, res: Response, next: NextFunction) => {});

  return router;
};
