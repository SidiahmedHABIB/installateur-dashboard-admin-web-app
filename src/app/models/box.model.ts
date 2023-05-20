import { CompanyModel } from "./company.model";
import { InterModel } from "./inter.model";
import { ReportModel } from "./report.model";

export interface BoxModel {
  id: number;
  status: string;
  name: string;
  entity: string;
  matricul: string;
  boxValue: string;
  nserie: string;
  isSend: boolean;
  creatAt: Date;
  upadateAt: Date;
  interventionBox: InterModel;
  reportBox: ReportModel;
}
export interface PageBoxModel {
  boxes: BoxModel[];
  totalPages: number;
}
