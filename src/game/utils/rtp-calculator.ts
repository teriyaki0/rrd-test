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
  [SuperWheelElement.KING]: 150,
  [SuperWheelElement.CARD]: 10,
};

export const REGULAR_PAYOUT_TABLE: PayoutTable = {
  [RegularWheelElement.CHERRY]: 0.5,   
  [RegularWheelElement.LEMON]: 0.5,    
  [RegularWheelElement.ORANGE]: 1.0, 
  [RegularWheelElement.PLUM]: 1.5,   
  [RegularWheelElement.PEAR]: 2.0,   
  [RegularWheelElement.GRAPE]: 2.5,  
  [RegularWheelElement.WATERMELON]: 5.0, 
  [RegularWheelElement.BELL]: 10.0,    
  [RegularWheelElement.KING]: 15.0,    
  [RegularWheelElement.JOKER]: 20.0,   
  [RegularWheelElement.BAR]: 3.0,    
  [RegularWheelElement.ANY]: 0.0, 
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