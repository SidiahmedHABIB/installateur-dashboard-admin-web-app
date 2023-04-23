import { ImageModel } from "./image.model";

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  creatAt: Date;
  upadateAt: Date;
  imageUser: ImageModel
}
export interface PageUsersModel {
  users: UserModel[];
  totalPages: number;
}

