import { config } from "../config";

export const corsSettings = {
  origin: [config.urls.client],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
