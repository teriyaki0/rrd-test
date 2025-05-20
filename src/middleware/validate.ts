import { NextFunction, Response } from "express";
import { z, ZodError, ZodObject, ZodTypeAny } from "zod";

import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { ExtendedRequest } from "../interfaces/express";
import { logger } from "../libs/logger";

type Schemas = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
  headers?: ZodTypeAny;
};

function makeStrict<T extends ZodTypeAny>(schema: T): T {
  if (schema instanceof ZodObject) {
    return schema.strict() as any;
  }
  return schema;
}

export function validate(schemas: Schemas) {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      for (const [key, schema] of Object.entries(schemas)) {
        if (!schema) continue;

        const strictSchema = makeStrict(schema);
        const value = (req as any)[key];
        logger.info({
          msg: "Incoming request data before validation",
          part: key,
          data: value,
          reqId: (req as any).id,
          method: req.method,
          url: req.url,
        });
        (req as any)[key] = strictSchema.parse(value);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        logger.warn({
          msg: ERROR_MESSAGE.COMMON.VALIDATION_ERROR,
          statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
          reqId: req.id,
          method: req.method,
          url: req.url,
          stack: err.stack,
        });

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: ERROR_MESSAGE.COMMON.VALIDATION_ERROR });
      }

      next(err);
    }
  };
}

export const idParamsSchema = z.object({
  id: z.coerce.number().min(1),
});

export type IdParams = z.infer<typeof idParamsSchema>;

export const paginationInputScheme = z.object({
  pageSize: z.coerce.number().min(1).default(10),
  page: z.coerce.number().min(1).default(1),
});

export type PaginationInput = z.infer<typeof paginationInputScheme>;
