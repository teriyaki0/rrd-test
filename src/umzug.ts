import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

import { config } from "./config";

const sequelize = new Sequelize({
  dialect: "postgres",
  ...config.db,
});

export const migrator = new Umzug({
  migrations: {
    glob: ["./migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
