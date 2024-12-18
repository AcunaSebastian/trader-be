import { UserModel } from "./user-model";

export interface IAuthRepository {
  login(email: string): Promise<UserModel | null>;
}
