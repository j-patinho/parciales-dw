import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Car } from "./Car";

export interface TuitionI {
  id?: number;
  date_matricula: Date;
  ciudad: string;
  pago: number;
  car_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Tuition extends Model {
  public id!: number;
  public date_matricula!: Date;
  public ciudad!: string;
  public pago!: number;
  public car_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Tuition.init(
  {
    date_matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
            msg: "date_matricula must be a valid date",
          },
      },
    },

    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Ciudad cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Ciudad must contain between 2 and 100 characters",
        },
      },
    },

    pago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Pago must be numeric" },
        min: {
          args: [0],
          msg: "Pago cannot be negative",
        },
      },
    },

    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cars",
        key: "id",
      },
      validate: {
        isInt: {
          msg: "car_id must be an integer",
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
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
  }
);