import express from "express";

import { sequelize } from "../libs/sequalize";
import { errorHandler } from "../middleware/error-handler";
import { loadContext } from "./context";
import { loadMiddlewares } from "./middlewares";
import { loadModels } from "./models";
import { loadPassport } from "./passport";
import { loadRoutes } from "./routes";
import { loadTelegraph } from "./telegraph";

export const loadApp = async () => {
  const app = express();

  loadModels(sequelize);

  const context = await loadContext();

  loadPassport(app, context);

  loadMiddlewares(app, context);

  // loadTelegraph(app, context);

  loadRoutes(app, context);

  app.use(errorHandler);

  return app;
};
