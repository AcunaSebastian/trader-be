import { PrismaClient } from "@prisma/client/extension";
import {
  ClientInsertDTO,
  ClientUpdateDTO,
} from "../../domain/entities/client-entity";

export class ClientServise {
  private readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async getCLientByUid(uid: string) {
    return await this.db.client.findUnique({
      where: { uid },
    });
  }

  async getClients() {
    return await this.db.client.findMany();
  }

  async createClient(client: ClientInsertDTO) {
    try {
      await this.db.client.create({
        data: {
          name: client.name,
        },
      });
    } catch (error) {}
  }

  async updateClient(client: ClientUpdateDTO) {
    try {
      await this.db.client.update({
        where: { id: client.id },
        data: client,
      });
    } catch (error) {}
  }

  async deleteClient(id: number) {
    try {
      await this.db.client.delete({
        where: { id },
      });
    } catch (error) {}
  }
}
