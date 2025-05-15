import { config } from "../config";

export const corsSettings = {
  origin: [config.urls.client],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const socketCors = {
  origin: corsSettings.origin,
  credentials: corsSettings.credentials,
  methods: corsSettings.methods,
};
