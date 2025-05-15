import express from "express";

import { Context } from "../interfaces/general";
import { requireAuth } from "../middleware/requireAuth";
import { makeAuthRouter } from "../routes/auth";
import { makeDoubleRouter } from "../routes/double";
import { makeGeneralRouter } from "../routes/general";
import { makeRegularRouter } from "../routes/regular";
import { makeSuperRouter } from "../routes/super";

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use("/auth", makeAuthRouter(context));

  app.use("/game", requireAuth, makeGeneralRouter(context));

  app.use("/game", requireAuth, makeRegularRouter(context));
  app.use("/super", requireAuth, makeSuperRouter(context));
  app.use("/double", requireAuth, makeDoubleRouter(context));
};
