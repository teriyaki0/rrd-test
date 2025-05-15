import { ERROR_MESSAGE } from "../../../constants/messages/error-messages.const";

export interface RandomPickOptions<T> {
  values: readonly T[];
  min: T;
  jackpot?: {
    chance: number;
    value: T;
  };
}

export function pickRandom<T extends number>(opts: RandomPickOptions<T>): T {
  if (opts.jackpot && Math.random() < opts.jackpot.chance) {
    return opts.jackpot.value;
  }

  let pool = opts.values;
  if (opts.min !== undefined) {
    pool = pool.filter((v) => v >= opts.min);
    if (pool.length === 0) {
      throw new Error(ERROR_MESSAGE.COMMON.FORBIDDEN);
    }
  }

  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
