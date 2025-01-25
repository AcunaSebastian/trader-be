export interface UserModel {
  id: number;
  email: string;
  name: string | null;
  picture: string | null;
  orders?: string;
  isActive: boolean;
}
