import express, { NextFunction, Response } from "express";

import { Context, RouterFactory } from "../../interfaces/general";

export const makeDoubleRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  return router;
};
