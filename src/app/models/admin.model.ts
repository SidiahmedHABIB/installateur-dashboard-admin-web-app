export interface AdminModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  creatAt: Date;
  upadateAt: Date;
}
export interface PageAdminModel {
  admins: AdminModel[];
  totalPages: number;
}
