import { NextFunction, Response } from "express";
import { IAuthRepository } from "../../../features/auth/domain/model/auth-model";
import { ApiResponseError } from "../../domain/model/api-response";
import { auth } from "express-oauth2-jwt-bearer";
import { constants } from "../utils/index";

export class AuthValidator {
  private readonly authRepo?: IAuthRepository;

  constructor(authRepo?: IAuthRepository) {
    this.authRepo = authRepo;
  }

  public verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const auth = req.auth;
    try {
      const userData = await fetch(`${auth.payload.aud[1]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => res.json());

      const user = await this.authRepo?.login(userData.email);
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

  static jwtCheck() {
    return auth({
      audience: constants.AUDIENCE,
      issuerBaseURL: constants.ISSUER_BASE_URL,
      tokenSigningAlg: constants.TOKEN_SIGNING_ALG,
    });
  }
}
