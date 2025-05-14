import { z } from "zod";

export const loginInputScheme = z.object({
  initData: z.string(),
});

export type LoginInput = Required<z.infer<typeof loginInputScheme>>;
