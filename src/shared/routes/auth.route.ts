import { Router } from "express";
import { login } from "../../auth/controller/auth_controller";

const authRouter = Router();

authRouter.post("/login", [], login);
authRouter.post("/register", []);

export default authRouter;
