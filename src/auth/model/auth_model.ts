import { AuthRepository } from "../repository/auth_repo";

export class AuthModel {
  private readonly repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  public async login(email: string) {
    return await this.repository.login(email);
  }
}
