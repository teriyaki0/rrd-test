import { randomBytes } from "crypto";

export function getWheelIndex<T extends string>(wheel: T[], weights: Record<T, number>): number {
  const entries = Object.entries(weights) as [T, number][];
  const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0);

  const randomBuffer = randomBytes(4);
  const randomNumber = randomBuffer.readUInt32BE(0);
  const target = randomNumber % totalWeight;

  let acc = 0;
  let selectedSymbol: T | null = null;

  for (const [symbol, weight] of entries) {
    acc += weight;
    if (target < acc) {
      selectedSymbol = symbol;
      break;
    }
  }

  if (!selectedSymbol) {
    selectedSymbol = entries[entries.length - 1][0];
  }

  const index = wheel.findIndex((el) => el === selectedSymbol);

  return index;
}
