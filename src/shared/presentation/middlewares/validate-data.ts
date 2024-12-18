import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ApiResponseError } from "../../domain/model/api-response";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((issue: any) => `${issue.path.join(".")} is ${issue.message}`)
          .join(`\n`);
        res
          .status(500)
          .json(new ApiResponseError("Error validating " + errorMessages));
        return;
      }

      res.status(500).json(new ApiResponseError("Error validating " + error));
      return;
    }
  };
}
