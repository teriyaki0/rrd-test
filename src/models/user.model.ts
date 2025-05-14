import { DataTypes, Model, Optional, Sequelize } from "sequelize";

import { Models } from "../interfaces/general";
import { Game } from "./game.model";

export interface UserAttributes {
  id: string;
  tgId: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes, Optional<UserAttributes, "id" | "createdAt" | "updatedAt">> implements UserAttributes {
  id: string;
  tgId: string;
  username: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;

    return values;
  }

  static defineSchema(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: true,
          primaryKey: true,
        },
        tgId: {
          type: DataTypes.STRING(128),
          field: "tg_id",
          allowNull: false,
          unique: true,
        },
        username: {
          type: new DataTypes.STRING(128),
          field: "username",
          allowNull: false,
        },
      },
      {
        tableName: "users",
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models) {
    Game.belongsTo(models.user, {
      as: "user",
      foreignKey: "userId",
    });
  }
}
