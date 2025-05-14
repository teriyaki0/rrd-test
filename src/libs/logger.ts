import path from "path";
import { pino } from "pino";

import { config } from "../config";
import { ensureDir } from "../utils/ensureDir";

const logDir = ensureDir("logs");

export const logger =
  process.env.NODE_ENV === "development"
    ? pino({
        transport: {
          targets: [
            {
              level: config.logging.level,
              target: "pino/file",
              options: {
                ignore: "pid,hostname",
                destination: path.join(logDir, "app.log"),
                mkdir: true,
              },
            },
            {
              level: "error",
              target: "pino/file",
              options: {
                ignore: "pid,hostname",
                destination: path.join(logDir, "error.log"),
                mkdir: true,
              },
            },
          ],
        },
      })
    : pino({
        transport: {
          targets: [
            {
              level: config.logging.level,
              target: "pino/file",
              options: {
                destination: path.join(logDir, "app.log"),
                mkdir: true,
              },
            },
            {
              level: "error",
              target: "pino/file",
              options: {
                destination: path.join(logDir, "error.log"),
                mkdir: true,
              },
            },
          ],
        },
      });
