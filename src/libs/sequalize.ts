import { Sequelize } from "sequelize";

import { config } from "../config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  ...config.db,
});
