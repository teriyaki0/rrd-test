import { Sequelize } from "sequelize";

import { Config } from "../config";

export const loadSequelize = (config: Config): Sequelize => {
  return new Sequelize({
    dialect: "postgres",
    ...config.db,
  });
};
