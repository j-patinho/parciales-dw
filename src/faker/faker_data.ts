import { faker } from "@faker-js/faker";

import { sequelize } from "../database/db";

import { Car } from "../models/Car";
import { Tuition } from "../models/Tuition";

async function createFakeData() {

  try {

    // Conectar a la base de datos
    await sequelize.authenticate();

    console.log("✅ Database connected");

    // ==============================
    // CREATE FAKE CARS
    // ==============================

    for (let i = 0; i < 20; i++) {

      await Car.create({

        marca: faker.vehicle.manufacturer(),

        clase: faker.helpers.arrayElement([
          "SUV",
          "SEDAN",
          "PICKUP",
          "HATCHBACK",
          "TRUCK"
        ]),

        modelo: faker.vehicle.model(),

        cilindraje: faker.number.float({
          min: 1.0,
          max: 5.0,
          fractionDigits: 1
        }),

        capacidad: faker.number.int({
          min: 2,
          max: 10
        }),

        status: "ACTIVE"
      });
    }

    console.log("✅ Fake cars created");

    // ==============================
    // CREATE FAKE TUITIONS
    // ==============================

    const cars = await Car.findAll();

    for (let i = 0; i < 20; i++) {

      await Tuition.create({

        date_matricula: faker.date.past(),

        ciudad: faker.location.city(),

        pago: faker.number.float({
          min: 100000,
          max: 1000000,
          fractionDigits: 2
        }),

        car_id: cars.length > 0
          ? cars[
              faker.number.int({
                min: 0,
                max: cars.length - 1
              })
            ]?.id
          : null,

        status: "ACTIVE"
      });
    }

    console.log("✅ Fake tuitions created");

    console.log("🎉 Fake data created successfully");

  } catch (error) {

    console.error(
      "❌ Error creating fake data:",
      error
    );

  } finally {

    await sequelize.close();
  }
}

createFakeData();