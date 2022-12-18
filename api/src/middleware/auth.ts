import { NextFunction, Request, Response } from "express";
import { IGetAuthorizationHeaderRequest } from "../interfaces/auth.interface";
import { asyncWrapper } from "../utils/asyncWrapper";
import { failure } from "../utils/responseMessage";

const isHost = asyncWrapper(
  async (
    req: IGetAuthorizationHeaderRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { role } = req.user;

    if (role === "host") {
      return next();
    }

    return res.json(failure("You are not authorized!"));
  }
);

export { isHost };
