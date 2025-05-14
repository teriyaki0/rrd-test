import { createServer } from "http";

import { config } from "./config";
import { logger } from "./libs/logger";
import { loadApp } from "./loaders/app";
import { loadSocket } from "./loaders/socket";

(async () => {
  const app = await loadApp();
  const httpServer = createServer(app);

  loadSocket(httpServer);

  httpServer.listen(config.app.port, () => logger.info(`Application is run on port ${config.app.port}`));
})();
