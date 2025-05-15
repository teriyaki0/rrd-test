import { createServer } from "http";

import { config } from "./config";
import { logger } from "./libs/logger";
import { loadApp } from "./loaders/app";
import { loadContext } from "./loaders/context";
import { loadSocket } from "./loaders/socket";

(async () => {
  const app = await loadApp();
  const httpServer = createServer(app);

  const context = await loadContext();

  loadSocket(httpServer, context);

  httpServer.listen(config.app.port, () => logger.info(`Application is run on port ${config.app.port}`));
})();
