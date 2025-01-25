import { Router } from "express";
import { ClientController } from "./controller/client-controller";
import { ClientServise } from "./service/client-service";

export class CLientRoutes {
  static get routes(): Router {
    const router = Router();

    const clientService = new ClientServise();
    const controller = new ClientController(clientService);

    router.get("/", [], controller.getClients);
    router.post("/add-client", [], controller.createClient);
    router.put("/edit-client/:uid", [], controller.updateClient);
    router.delete("/delete-client/uid", [], controller.deleteClient);

    return router;
  }
}
