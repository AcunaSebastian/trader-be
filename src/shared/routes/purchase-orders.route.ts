import { Router } from "express";
import { getPo, postPo } from "../../po/controller";
import { JWTAdapterImpl } from "../adapters/jwt_adapter";
import { verifyToken } from "../middlewares/verify_token";

const poRouter = Router();

poRouter.get("/get-po", [JWTAdapterImpl.jwtCheck(), verifyToken], getPo);
poRouter.post("/post-po", [JWTAdapterImpl.jwtCheck()], postPo);

export default poRouter;
