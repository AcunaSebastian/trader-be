import { AuthModel } from "../../auth/model/auth_model";
import { AuthRepository } from "../../auth/repository/auth_repo";
import { JWTAdapterImpl } from "../adapters/jwt_adapter";
import { ApiResponseError } from "../model/api-response";

export const verifyToken = async (req: any, res: any, next: any) => {
  const auth = req.auth;
  try {
    const userData = await fetch(`${auth.payload.aud[1]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    }).then((res) => res.json());

    const authModel = new AuthModel();
    const user = await authModel.login(userData.email);
    if (!user) {
      const errorApiResponse = new ApiResponseError("User does not exist");
      res.status(401).json(errorApiResponse.response());
      return;
    }
    req.user = user;
    next();
    return;
  } catch (error) {
    const errorApiResponse = new ApiResponseError(
      `Auth verify failed [ERROR]: ${error}`
    );
    res.status(401).json(errorApiResponse.response());
    return;
  }
};
