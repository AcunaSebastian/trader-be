import { Router } from "express";
import { AuthController } from "../controller/auth_controller";
import { AuthRepository } from "../repository/auth_repo";

const authRouter = Router();
const authRepo = new AuthRepository();
const controller = new AuthController(authRepo);

authRouter.post("/login", [], controller.login);
authRouter.post("/register", []);

export default authRouter;
