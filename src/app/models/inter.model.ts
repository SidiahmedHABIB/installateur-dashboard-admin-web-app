import { CompanyModel } from "./company.model";
import { UserModel } from "./user.model";

export interface InterModel {
  id: number;
  comment: string;
  appointmentAt: Date;
  status: string;
  creatAt: Date;
  updateAt: Date;
  user: UserModel;
  company: CompanyModel;
}
export interface PageInterModel {
  interventions: InterModel[];
  totalPages: number;
}
