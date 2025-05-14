import express from "express";

import { Context } from "../interfaces/general";
import { requireAuth } from "../middleware/requireAuth";
import { makeAuthRouter } from "../routes/auth";
import { makeGeneralRouter } from "../routes/general";

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use("/api/auth", makeAuthRouter(context));

  app.use("/api/game", requireAuth, makeGeneralRouter(context));
};
