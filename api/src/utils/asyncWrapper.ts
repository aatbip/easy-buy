import { NextFunction, Request, Response } from "express";

export const asyncWrapper = (fn: Function) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
