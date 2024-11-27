export interface PurchaseOrder {
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
  inspectionDate?: Date;
  port: string;
  etd?: Date;
  eta?: Date;
  status: PoStatus;
}

export type PoStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";
