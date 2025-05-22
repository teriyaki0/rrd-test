import { randomBytes } from "crypto";


export function getWheelIndex<T extends string>(wheel: T[], weights: Record<T, number>): number {
  const weightValues = wheel.map((element) => weights[element] || 1);
  const totalWeight = weightValues.reduce((acc, weight) => acc + weight, 0);

  const randomBuffer = randomBytes(4);
  const randomNumber = randomBuffer.readUInt32BE(0);

  const random = randomNumber % totalWeight;

  let accumulated = 0;
  for (let i = 0; i < weightValues.length; i++) {
    accumulated += weightValues[i];
    if (random < accumulated) {
      return i;
    }
  }

  return wheel.length - 1;
}
