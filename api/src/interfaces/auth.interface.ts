import { Request } from "express";
import { Types } from "mongoose";

export interface IUserCredentials {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  shopName: string;
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IGetAuthorizationHeaderRequest extends Request {
  user: IJwtPayload;
}

export interface IMulterRequest extends Request {
  file: any;
}
