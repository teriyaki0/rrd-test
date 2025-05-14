import { DataTypes, Model, Optional, Sequelize } from "sequelize";

import { Models } from "../interfaces/general";
import { User } from "./user.model";

export interface GameAttributes {
  id: string;
  userId: string;
  cards: number;
  credits: number;
  winPoint: number;
  superPoint: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Game extends Model<GameAttributes, Optional<GameAttributes, "id" | "createdAt" | "updatedAt">> implements GameAttributes {
  id: string;
  userId: string;
  cards: number;
  credits: number;
  winPoint: number;
  superPoint: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;

    return values;
  }

  static defineSchema(sequelize: Sequelize) {
    Game.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        cards: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        credits: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        winPoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        superPoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: "games",
        underscored: true,
        sequelize,
      },
    );
  }

  static associate(models: Models) {
    User.hasMany(models.game, {
      foreignKey: "userId",
      as: "games",
    });
  }
}
