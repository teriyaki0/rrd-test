import { Sequelize } from "sequelize";

import { Models } from "../interfaces/general";
import { User } from "../models/user.model";

export const loadModels = (sequelize: Sequelize): Models => {
  const models: Models = {
    user: User,
  };

  for (const model of Object.values(models)) {
    model.defineSchema(sequelize);
  }

  for (const model of Object.values(models)) {
    model.associate(models, sequelize);
  }

  return models;
};
