import express from "express";

import { Context } from "../interfaces/general";
import { requireAuth } from "../middleware/requireAuth";
import { makeAuthRouter } from "../routes/auth";
import { makeDoubleRouter } from "../routes/double";
import { makeGeneralRouter } from "../routes/general";
import { makeRegularRouter } from "../routes/regular";
import { makeSuperRouter } from "../routes/super";

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use("/api/auth", makeAuthRouter(context));

  app.use("/api/game", requireAuth, makeGeneralRouter(context));

  app.use("/api/game", requireAuth, makeRegularRouter(context));
  app.use("/api/super", requireAuth, makeSuperRouter(context));
  app.use("/api/double", requireAuth, makeDoubleRouter(context));
};
