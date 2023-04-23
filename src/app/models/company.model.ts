import { BoxModel } from "./box.model";
import { ImageModel } from "./image.model";

export interface CompanyModel {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  creatAt: Date;
  upadateAt: Date;
  imageCompany: ImageModel;
}

export interface PageCompanyModel {
  companies: CompanyModel[];
  totalPages: number;
}
