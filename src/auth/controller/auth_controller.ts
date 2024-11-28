import { Request, Response } from "express";
import {
  ApiResponseError,
  ApiResponseOk,
} from "../../shared/model/api-response";
import { AuthModel } from "../model/auth_model";
import { JWTAdapterImpl } from "../../shared/adapters/jwt_adapter";

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const authModel = new AuthModel();
    const user = await authModel.login(email);

    if (!user) {
      const resp = new ApiResponseError("User doesnt exist");
      res.status(400).json(resp.response());
      return;
    }

    if (!user.isActive) {
      const resp = new ApiResponseError("User is not active");
      res.status(400).json(resp.response());
      return;
    }

    const token = new JWTAdapterImpl().sign({ email: user.email });
    const resp = new ApiResponseOk("User Logged In", { user, token });

    res.status(200).json(resp.response());
  } catch (error) {
    const resp = new ApiResponseError("[ERROR IN LOGIN] : " + error);
    res.status(500).json(resp.response());
  }
};
