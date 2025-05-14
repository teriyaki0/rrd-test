import { DataTypes, Model, Optional, Sequelize } from "sequelize";

import { Models } from "../interfaces/general";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  title: string;
  summary: string;
  role: UserRole;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes, Optional<UserAttributes, "id">> implements UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  title: string;
  summary: string;
  role: UserRole;
  email: string;
  password: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;

    delete values.password;

    return values;
  }

  static defineSchema(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          field: "first_name",
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        lastName: {
          field: "last_name",
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        image: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        title: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        summary: {
          type: new DataTypes.STRING(256),
          allowNull: false,
        },
        role: {
          type: new DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
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

  static associate(models: Models) {}
}
