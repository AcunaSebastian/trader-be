import { PrismaClient } from "@prisma/client";
import {
  GetManyFilters,
  IPurchaseOrderRepository,
  PurchaseOrderModel,
} from "../../domain/model/purchase_order_model";

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
  private readonly db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }

  public async getMany({ limit, pagina, userId }: GetManyFilters) {
    return await this.db.purchaseOrder.findMany({
      where: { userId },
      skip: pagina,
      take: limit,
    });
  }

  public async getCountPo(payload: GetManyFilters) {
    return await this.db.purchaseOrder.count({
      where: { userId: payload.userId },
    });
  }

  public async put(po: PurchaseOrderModel) {
    const result = await this.db.purchaseOrder.create({
      data: {
        userId: po.userId,
        sawmill: po.sawmill,
        po: po.po,
        grade: po.grade,
        thikness: po.thikness,
        width: po.width,
        large: po.large,
        quantity: po.quantity,
        client: po.client,
        inspectionDate: po.inspectionDate,
        port: po.port,
        etd: po.etd,
        eta: po.eta,
        status: po.status,
      },
    });
    console.log(result);
    return result;
  }
}
