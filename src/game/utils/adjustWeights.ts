import { Mode } from "../../constants/game/mode.type";

export function adjustWeights<T extends string>(multiplier: Mode, weights: Record<T, number>): Record<T, number> {
  if (multiplier === "x1") return weights;

  const adjustedWeights: Record<T, number> = { ...weights };
  for (const key in adjustedWeights) {
    if (adjustedWeights[key as T] > 1) {
      adjustedWeights[key as T] = Math.max(Math.ceil(adjustedWeights[key as T] * 0.5), 1);
    }
  }

  return adjustedWeights;
}
