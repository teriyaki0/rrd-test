import { z } from "zod";

export const signInInputScheme = z.object({
  initData: z.string(),
});

export type signInInput = Required<z.infer<typeof signInInputScheme>>;
