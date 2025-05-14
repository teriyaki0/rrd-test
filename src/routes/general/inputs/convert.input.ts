import { z } from "zod";

export const convertInputScheme = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number(),
});
