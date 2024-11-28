import { Router } from "express";
import { getPo, postPo } from "../../po/controller";
import { verifyToken } from "../middlewares/verify_token";

const poRouter = Router();

poRouter.get("/get-po", [verifyToken], getPo);
poRouter.post("/post-po", [verifyToken], postPo);

export default poRouter;
