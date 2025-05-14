import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressRequestId from "express-request-id";

import { Loader } from "../interfaces/general";
import { corsSettings } from "../middleware/cors-settings";
import { requestLogging } from "../middleware/request-logging";
import { sessionMiddleware } from "../middleware/session";

export const loadMiddlewares: Loader = (app, context) => {
  app.use(express.json());

  app.use(cookieParser());

  app.use(cors(corsSettings));

  app.use(expressRequestId());

  app.use(requestLogging);

  app.use(sessionMiddleware);
};
