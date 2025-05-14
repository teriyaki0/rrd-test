import { config } from "./config";
import { logger } from "./libs/logger";
import { loadApp } from "./loaders/app";

(async () => {
  const app = await loadApp();

  app.listen(config.app.port, () => logger.info(`Application is run`));
})();
