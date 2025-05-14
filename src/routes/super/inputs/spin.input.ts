import { z } from "zod";

export const spinInputSchema = z.object({
  mode: z.number().refine((val) => [1, 2, 3].includes(val)),
  combination: z.array(z.number().refine((val) => val === 0 || val === 1)).length(3),
});
