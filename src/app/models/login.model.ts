import { AdminModel } from "./admin.model";

export interface LoginRequest {
  email: String;
  password: String;
}
export interface LoginResponse {
  status: String;
  admin: AdminModel;
}
