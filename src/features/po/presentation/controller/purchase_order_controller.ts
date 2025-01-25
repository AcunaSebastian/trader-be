import { Request, Response } from "express";

import { IPurchaseOrderRepository } from "../../domain/model/purchase_order_model";
import {
  ApiResponseError,
  ApiResponseOk,
} from "../../../../shared/domain/model/api-response";

export class PurchaseOrderController {
  constructor(private readonly repo: IPurchaseOrderRepository) {}

  public getPo = async (req: any, res: Response) => {
    const { page = 1, limit = 10 } = req.query as unknown as {
      page: number;
      limit: number;
    };

    try {
      const user = req.user;

      if (!user) {
        const resp = new ApiResponseError("User does not exist");
        res.status(401).json(resp.response());
      }

      const skip = page == 1 ? page - 1 : page;
      const limite = skip == 0 ? limit : skip * limit;

      const poList = await this.repo.getMany({
        userId: user?.id,
        pagina: Number(skip),
        limit: Number(limite),
      });
      const total = await this.repo.getCountPo({ userId: user?.id });

      const resp = new ApiResponseOk("Po List", { pos: poList, total });
      res.status(200).json(resp.response());
    } catch (error) {
      const resp = new ApiResponseError("Error in GET PO : " + error);
      res.status(500).json(resp.response());
    }
  };

  public postPo = async (req: Request, res: Response) => {
    try {
      const {
        sawmill,
        po,
        grade,
        thikness,
        width,
        large,
        quantity,
        client,
        inspectionDate,
        port,
        etd,
        eta,
        status,
      } = req.body;

      const newPo = await this.repo.put({
        client: client,
        eta: eta != null ? new Date(eta) : undefined,
        etd: etd != null ? new Date(etd) : undefined,
        grade: grade,
        inspectionDate:
          inspectionDate != null ? new Date(inspectionDate) : undefined,
        large: large,
        po: po,
        port: port,
        quantity: quantity,
        sawmill: sawmill,
        status: status,
        thikness: thikness,
        userId: 1,
        width: width,
      });

      const resp = new ApiResponseOk("PO Created", newPo);
      res.status(200).json(resp.response());
    } catch (error) {
      const resp = new ApiResponseError("Error in posting PO : " + error);
      res.status(500).json(resp.response());
    }
  };
}
