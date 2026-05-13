import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Tuition } from "./Tuition";

export interface CarI {
  id?: number;
  marca: string;
  clase: string;
  modelo: string;
  cilindraje: number;
  capacidad: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Car extends Model {
  public id!: number;
  public marca!: string;
  public clase!: string;
  public modelo!: string;
  public cilindraje!: number;
  public capacidad!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Car.init(
  {
    marca: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Marca cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Marca must contain between 2 and 100 characters",
        },
      },
    },

    clase: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Clase cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Clase must contain between 2 and 100 characters",
        },
      },
    },

    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Modelo cannot be empty" },
        len: {
          args: [1, 100],
          msg: "Modelo must contain between 1 and 100 characters",
        },
      },
    },

    cilindraje: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Cilindraje must be numeric" },
        min: {
          args: [1],
          msg: "Cilindraje must be greater than 0",
        },
      },
    },

    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Capacidad must be an integer" },
        min: {
          args: [1],
          msg: "Capacidad must be greater than 0",
        },
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "cars",
    timestamps: false,
  }
);

Car.hasMany(Tuition, {
  foreignKey: "car_id",
  sourceKey: "id",
});

Tuition.belongsTo(Car, {
  foreignKey: "car_id",
  targetKey: "id",
});