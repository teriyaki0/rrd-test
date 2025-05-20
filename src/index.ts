import { config } from "./config";
import { logger } from "./libs/logger";
import { loadServer } from "./loaders/server";

(async () => {
  const server = await loadServer();

  server.listen(config.app.port, () => logger.info(`Application is run on port ${config.app.port}`));
})();
