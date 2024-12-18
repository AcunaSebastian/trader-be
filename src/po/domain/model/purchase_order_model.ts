export interface PurchaseOrderModel {
  id?: number;
  userId: number;
  sawmill: string;
  po: string;
  grade: string;
  thikness: string;
  width: string;
  large: string;
  quantity: string;
  client: string;
  inspectionDate?: Date | null;
  port: string;
  etd?: Date | null;
  eta?: Date | null;
  status: PoStatus;
}

export interface IPurchaseOrderRepository {
  getMany(query: GetManyFilters): Promise<PurchaseOrderModel[]>;
  getCountPo(query: GetManyFilters): Promise<number>;
  put(po: PurchaseOrderModel): Promise<PurchaseOrderModel>;
}

export type GetManyFilters = {
  userId?: number;
  pagina?: number;
  limit?: number;
};

export type PoStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";
