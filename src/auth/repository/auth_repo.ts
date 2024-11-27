import { PrismaClient } from "@prisma/client";

export class AuthRepository {
  private readonly db;
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
