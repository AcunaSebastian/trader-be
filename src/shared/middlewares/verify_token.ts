import { JWTAdapterImpl } from "../adapters/jwt_adapter";
import { ApiResponseError } from "../model/api-response";

export const verifyToken = (req: any, res: any, next: any) => {
  const header = req.headers["authorization"] || "";
  const token = header.split(" ")?.[1] ?? undefined;
  if (!token) {
    const errorApiResponse = new ApiResponseError("No token provided");
    res.status(401).json(errorApiResponse.response());
    return;
  }

  try {
    const payload = new JWTAdapterImpl().verify(token);
    req.user = payload;
    next();
  } catch (error) {
    const errorApiResponse = new ApiResponseError(
      `Token no valid [ERROR]: ${error}`
    );
    res.status(401).json(errorApiResponse.response());
    return;
  }
};
