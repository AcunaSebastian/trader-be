import { Router } from "express";

import { AuthRepository } from "../../../auth/presentation/repository/auth_repo";
import { AuthValidator } from "../../../../shared/presentation/middlewares/verify_token";
import { PurchaseOrderController } from "../controller/purchase_order_controller";
import { PurchaseOrderRepository } from "../repository/purchase_order_repo";

const poRouter = Router();
const purchaseOrderRepo = new PurchaseOrderRepository();
const authRepo = new AuthRepository();
const controller = new PurchaseOrderController(purchaseOrderRepo);
const authValidator = new AuthValidator(authRepo);

poRouter.get(
  "/get-po",
  [AuthValidator.jwtCheck(), authValidator.verifyToken],
  controller.getPo
);
poRouter.post("/post-po", [AuthValidator.jwtCheck()], controller.postPo);

export default poRouter;
