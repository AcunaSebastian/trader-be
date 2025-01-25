import { Router } from "express";
import { CLientRoutes } from "../../features/clients/presentation/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/clients", CLientRoutes.routes);

    return router;
  }
}
