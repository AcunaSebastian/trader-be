import { Request, Response } from "express";
import {
  ApiResponseError,
  ApiResponseOk,
} from "../../../shared/domain/model/api-response";
import { IAuthRepository } from "../../domain/model/auth-model";

export class AuthController {
  private readonly repo: IAuthRepository;
  constructor(repo: IAuthRepository) {
    this.repo = repo;
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await this.repo.login(email);

      if (!user) {
        const resp = new ApiResponseError("User does not exist");
        res.status(400).json(resp.response());
        return;
      }

      if (!user.isActive) {
        const resp = new ApiResponseError("User is not active");
        res.status(400).json(resp.response());
        return;
      }

      const resp = new ApiResponseOk("User Logged In", { user });

      res.status(200).json(resp.response());
    } catch (error) {
      const resp = new ApiResponseError("[ERROR IN LOGIN] : " + error);
      res.status(500).json(resp.response());
    }
  };
}
