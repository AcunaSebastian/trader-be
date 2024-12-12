import { PrismaClient } from "@prisma/client";
import { PurchaseOrder } from "../model/interfaces";
import { GetManyQueries } from "../model/po_model";

export class PurchaseOrderRepository {
  private readonly db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }

  public async getMany({ limit, pagina }: GetManyQueries) {
    return await this.db.purchaseOrder.findMany({ skip: pagina, take: limit });
  }

  public async getCountPo() {
    return await this.db.purchaseOrder.count();
  }

  public async put(po: PurchaseOrder) {
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
