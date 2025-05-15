import { randomBytes } from "crypto";

export function isWin(chance: number) {
  const randomBuffer = randomBytes(4);
  const randomNumber = randomBuffer.readUInt32BE(0);
  const random = randomNumber % 100;
  return random < chance;
}
