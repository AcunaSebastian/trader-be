import { PurchaseOrderRepository } from "../repository/purchase_order_repo";
import { PurchaseOrder } from "./interfaces";

export interface GetManyQueries {
  pagina: number;
  limit: number;
}

export class PurchaseOrderModel {
  private readonly repository: PurchaseOrderRepository;
  constructor() {
    this.repository = new PurchaseOrderRepository();
  }

  public async getMany({ pagina, limit }: GetManyQueries) {
    return await this.repository.getMany({ pagina, limit });
  }

  public async getCountPo() {
    return await this.repository.getCountPo();
  }

  public async put(po: PurchaseOrder) {
    return await this.repository.put(po);
  }
}
