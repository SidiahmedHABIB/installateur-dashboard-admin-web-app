import { CompanyModel } from "./company.model";
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
  componyBox: CompanyModel;
  reportBox: ReportModel;
}
export interface PageBoxModel {
  boxes: BoxModel[];
  totalPages: number;
}
