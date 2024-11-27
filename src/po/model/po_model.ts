import { PurchaseOrderRepository } from "../repository/purchase_order_repo";
import { PurchaseOrder } from "./interfaces";

export class PurchaseOrderModel {
  private readonly repository: PurchaseOrderRepository;
  constructor() {
    this.repository = new PurchaseOrderRepository();
  }

  public async getMany() {
    return await this.repository.getMany();
  }

  public async put(po: PurchaseOrder) {
    return await this.repository.put(po);
  }
}
