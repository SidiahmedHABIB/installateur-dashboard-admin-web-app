import { AdminModel } from "./admin.model";
import { UserModel } from "./user.model";

export interface LoginRequest {
  email: String;
  password: String;
}


export interface LoginResponse {
  data: AdminModel;
  tokens: Tokens;
}


export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
