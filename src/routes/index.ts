import { Router } from "express";

import { CarRoutes } from "./car";
import { TuitionRoutes } from "./tuition";

export class Routes {

  // Agrega tus rutas aquí de la siguiente manera
  public carRoutes: CarRoutes = new CarRoutes();

  public tuitionRoutes: TuitionRoutes = new TuitionRoutes();
}