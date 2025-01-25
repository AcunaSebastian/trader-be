import { Request, Response } from "express";
import { ClientServise } from "../service/client-service";
import { ClientEntity } from "../../domain/entities/client-entity";

export class ClientController {
  constructor(private readonly clientService: ClientServise) {}

  public getClients = async (req: any, res: Response) => {
    try {
      const response = await this.clientService.getClients();
      const clients = response.map(ClientEntity.fromJson);
      res.status(200).json({ ok: true, data: clients });
    } catch (error) {
      console.log(error);

      res.status(500);
    }
  };

  public createClient = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      await this.clientService.createClient({ name });

      res
        .status(201)
        .json({ ok: true, message: "Client created successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  public updateClient = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const { name } = req.body;

      if (!uid) {
        throw new Error("Uid is required");
      }
      const clientExist = await this.clientService.getCLientByUid(uid);

      if (!clientExist) {
        throw new Error("Client not found");
      }
      const client = ClientEntity.fromJson({ ...clientExist, name });

      if (!client) {
        throw new Error("Client error");
      }
      await this.clientService.updateClient(client);
      res
        .status(201)
        .json({ ok: true, message: "Client created successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  public deleteClient = async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;

      if (!uid) {
        throw new Error("Uid is required");
      }
      const clientExist = await this.clientService.getCLientByUid(uid);

      if (!clientExist) {
        throw new Error("Client not found");
      }
      await this.clientService.deleteClient(clientExist.id);

      res
        .status(201)
        .json({ ok: true, message: "Client deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  };
}
