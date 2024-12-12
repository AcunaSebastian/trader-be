import { Request, Response } from "express";
import {
  ApiResponseError,
  ApiResponseOk,
} from "../../shared/model/api-response";
import { PurchaseOrderModel } from "../model/po_model";

export const getPo = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as unknown as {
    page: number;
    limit: number;
  };

  // const user = req.user;

  const po = new PurchaseOrderModel();

  const skip = page == 1 ? page - 1 : page;
  const limite = skip == 0 ? limit : skip * limit;

  const poList = await po.getMany({
    pagina: Number(skip),
    limit: Number(limite),
  });
  const total = await po.getCountPo();

  const resp = new ApiResponseOk("Po List", { register: poList, total });
  res.status(200).json(resp.response());
};

export const postPo = async (req: Request, res: Response) => {
  try {
    const poModel = new PurchaseOrderModel();

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

    const newPo = await poModel.put({
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
