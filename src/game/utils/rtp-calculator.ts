import { SuperWheelElement } from "../../constants/game/super-wheel.enum";
import { RegularWheelElement } from "../../constants/game/regular-wheel.enum";
import { ReelRegularWeights } from "../weight/regular-weight.";
import { ReelSuperWeights } from "../weight/super-weight.";

interface PayoutTable {
  [key: string]: number;
}

export const SUPER_PAYOUT_TABLE: PayoutTable = {
  [SuperWheelElement.ORANGE]: 8,
  [SuperWheelElement.PLUM]: 16,
  [SuperWheelElement.PEAR]: 20,
  [SuperWheelElement.STRAWBERRY]: 24,
  [SuperWheelElement.GRAPE]: 48,
  [SuperWheelElement.WATERMELON]: 64,
  [SuperWheelElement.BELL]: 100,
  [SuperWheelElement.SEVEN]: 120,
  [SuperWheelElement.KING]: 200,
  [SuperWheelElement.CARD]: 10,
};

export const REGULAR_PAYOUT_TABLE: PayoutTable = {
  [RegularWheelElement.CHERRY]: 8,
  [RegularWheelElement.LEMON]: 8,
  [RegularWheelElement.ORANGE]: 12,
  [RegularWheelElement.PLUM]: 16,
  [RegularWheelElement.PEAR]: 20,
  [RegularWheelElement.GRAPE]: 20,
  [RegularWheelElement.WATERMELON]: 40,
  [RegularWheelElement.BELL]: 80,
  [RegularWheelElement.KING]: 80,
  [RegularWheelElement.JOKER]: 40,
  [RegularWheelElement.BAR]: 16,
  [RegularWheelElement.ANY]: 0,
};

export function calculateSingleReelRTP<T extends string>(
  weights: Record<T, number>,
  payoutTable: Record<string, number>
): number {
  const totalWeight = (Object.values(weights) as number[]).reduce((sum, weight) => sum + weight, 0);

  let expectedReturn = 0;
  for (const symbol in weights) {
    if (weights[symbol as T] > 0) {
      const probability = weights[symbol as T] / totalWeight;
      const payout = payoutTable[symbol] || 0;
      expectedReturn += probability * payout;
    }
  }

  return expectedReturn * 100;
}

export function calculateMultiReelRTP<T extends string>(
  reelsWeights: Record<T, number>[],
  payoutTable: Record<string, number>
): number {
  const reelsRTP = reelsWeights.map(weights => 
    calculateSingleReelRTP(weights, payoutTable)
  );

  return reelsRTP.reduce((sum, rtp) => sum + rtp, 0) / reelsRTP.length;
}

export function calculateSuperWheelRTP(weights: ReelSuperWeights): number {
  return calculateSingleReelRTP(weights, SUPER_PAYOUT_TABLE);
}

export function calculateRegularWheelRTP(weights: ReelRegularWeights): number {
  return calculateSingleReelRTP(weights, REGULAR_PAYOUT_TABLE);
}