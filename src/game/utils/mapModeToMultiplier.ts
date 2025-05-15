import { Mode } from "../../constants/game/mode.type";

export const mapModeToMultiplier = (mode: number): Mode => {
  const allowedModes = [1, 2, 3] as const;

  if (!allowedModes.includes(mode as (typeof allowedModes)[number])) {
    throw new Error(`Invalid mode: ${mode}`);
  }

  return `x${mode}` as Mode;
};
