import express from "express";
import expressRequestId from "express-request-id";

import { Loader } from "../interfaces/general";
import { requestLogging } from "../middleware/request-logging";

export const loadMiddlewares: Loader = (app, context) => {
  app.use(express.json());

  app.use(expressRequestId());

  app.use(requestLogging);
};
