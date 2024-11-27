import { Router } from "express";
import { getPo, postPo } from "../../po/controller";

const poRouter = Router();

poRouter.get("/get-po", [], getPo);
poRouter.post("/post-po", [], postPo);

export default poRouter;
