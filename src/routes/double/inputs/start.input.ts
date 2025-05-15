import { z } from "zod";

const ModesEnum = z.enum(["super", "default"]);

export const startDoubleInputScheme = z.object({
  mode: ModesEnum,
});
