import { PrismaClient } from "@prisma/client";
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
    return await this.db.clients.findUnique({
      where: { uid },
    });
  }

  async getClients() {
    return await this.db.clients.findMany();
  }

  async createClient(client: ClientInsertDTO) {
    try {
      await this.db.clients.create({
        data: {
          name: client.name,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateClient(client: ClientUpdateDTO) {
    try {
      await this.db.clients.update({
        where: { id: client.id },
        data: client,
      });
    } catch (error) {}
  }

  async deleteClient(id: number) {
    try {
      await this.db.clients.delete({
        where: { id },
      });
    } catch (error) {}
  }
}
