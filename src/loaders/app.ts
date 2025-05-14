import express from "express";

import { config } from "../config";
import { errorHandler } from "../middleware/error-handler";
import { loadContext } from "./context";
import { loadMiddlewares } from "./middlewares";
import { loadModels } from "./models";
import { loadPassport } from "./passport";
import { loadRoutes } from "./routes";
import { loadSequelize } from "./sequelize";
import { loadTelegraph } from "./telegraph";

export const loadApp = async () => {
  const app = express();
  const sequelize = loadSequelize(config);

  loadModels(sequelize);

  const context = await loadContext();

  loadPassport(app, context);

  loadMiddlewares(app, context);

  loadTelegraph(app, context);

  loadRoutes(app, context);

  app.use(errorHandler);

  return app;
};
