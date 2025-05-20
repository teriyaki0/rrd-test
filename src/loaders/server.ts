import express from "express";
import { createServer } from "http";

import { sequelize } from "../libs/sequalize";
import { errorHandler } from "../middleware/error-handler";
import { loadContext } from "./context";
import { loadMiddlewares } from "./middlewares";
import { loadModels } from "./models";
import { loadPassport } from "./passport";
import { loadRoutes } from "./routes";
import { loadSocket } from "./socket";
import { loadTelegraph } from "./telegraph";

export const loadServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  loadModels(sequelize);

  const context = await loadContext();

  loadSocket(httpServer, context);

  loadPassport(app, context);

  loadMiddlewares(app, context);

  loadTelegraph(app, context);

  loadRoutes(app, context);

  app.use(errorHandler);

  return httpServer;
};
