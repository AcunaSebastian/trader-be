import { Request, Response } from "express";
import { PurchaseOrderModel } from "../model/po_model";
import {
  ApiResponseError,
  ApiResponseOk,
} from "../../shared/model/api-response";

export const getPo = async (req: Request, res: Response) => {
  const po = new PurchaseOrderModel();

  const poList = await po.getMany();

  const resp = new ApiResponseOk("Po List", poList);
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
    const resp = new ApiResponseError("[ERROR IN POSTING PO] : " + error);
    res.status(500).json(resp.response());
  }
};
