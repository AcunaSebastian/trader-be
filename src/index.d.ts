import { UserModel } from "./features/auth/domain/model/user-model";

export declare global {
  namespace Express {
    interface Request {
      user: UserModel | null;
    }
  }
}
