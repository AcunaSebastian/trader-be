import { PrismaClient } from "@prisma/client";
import { IAuthRepository } from "../../domain/model/auth-model";

export class AuthRepository implements IAuthRepository {
  private readonly db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }

  public async login(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
