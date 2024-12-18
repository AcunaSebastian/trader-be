import { UserModel } from "./auth/domain/model/user-model";

export declare global {
  namespace Express {
    interface Request {
      user: UserModel | null;
    }
  }
}
