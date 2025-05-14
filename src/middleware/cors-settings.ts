import { config } from "../config";

export const corsSettings = {
  origin: [config.urls.client],
  credentials: true,
};
