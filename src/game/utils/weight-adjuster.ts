import { config } from "../../config";
import { ReelRegularWeights } from "../weight/regular-weight.";
import { ReelSuperWeights } from "../weight/super-weight.";
import { calculateSingleReelRTP, SUPER_PAYOUT_TABLE, REGULAR_PAYOUT_TABLE } from "./rtp-calculator";

export function adjustWeightsForRTP<T extends string>(
  weights: Record<T, number>,
  payoutTable: Record<string, number>,
  targetRTP: number = config.rtp.targetRtp
): Record<T, number> {
  const adjustedWeights: Record<T, number> = { ...weights };

  const currentRTP = calculateSingleReelRTP(adjustedWeights, payoutTable);

  if (Math.abs(currentRTP - targetRTP) < 0.1) {
    return adjustedWeights;
  }

  const sortedSymbols = Object.keys(payoutTable)
    .filter(symbol => adjustedWeights[symbol as T] !== undefined)
    .sort((a, b) => (payoutTable[b] || 0) - (payoutTable[a] || 0));

  const needToIncreaseRTP = currentRTP < targetRTP;

  let iterations = 0;
  const maxIterations = config.rtp.maxIterations || 100;
  const adjustmentStep = config.rtp.adjustmentStep || 0.1;

  while (Math.abs(calculateSingleReelRTP(adjustedWeights, payoutTable) - targetRTP) > 0.1 && 
         iterations < maxIterations) {

    if (needToIncreaseRTP) {
      for (const symbol of sortedSymbols.slice(0, Math.ceil(sortedSymbols.length / 3))) {
        if (adjustedWeights[symbol as T] !== undefined) {
          adjustedWeights[symbol as T] *= (1 + adjustmentStep);
        }
      }

      for (const symbol of sortedSymbols.slice(-Math.ceil(sortedSymbols.length / 3))) {
        if (adjustedWeights[symbol as T] !== undefined && adjustedWeights[symbol as T] > 1) {
          adjustedWeights[symbol as T] = Math.max(
            adjustedWeights[symbol as T] * (1 - adjustmentStep), 
            config.rtp.minWeight || 0
          );
        }
      }
    } else {
      for (const symbol of sortedSymbols.slice(0, Math.ceil(sortedSymbols.length / 3))) {
        if (adjustedWeights[symbol as T] !== undefined && adjustedWeights[symbol as T] > 1) {
          adjustedWeights[symbol as T] = Math.max(
            adjustedWeights[symbol as T] * (1 - adjustmentStep), 
            config.rtp.minWeight || 0
          );
        }
      }

      for (const symbol of sortedSymbols.slice(-Math.ceil(sortedSymbols.length / 3))) {
        if (adjustedWeights[symbol as T] !== undefined) {
          adjustedWeights[symbol as T] *= (1 + adjustmentStep);
        }
      }
    }

    iterations++;
  }

  for (const symbol in adjustedWeights) {
    adjustedWeights[symbol as T] = Math.max(
      Math.round(adjustedWeights[symbol as T]), 
      config.rtp.minWeight || 0
    );
  }

  return adjustedWeights;
}

export function adjustSuperWeightsForRTP(
  weights: ReelSuperWeights,
  targetRTP: number = config.rtp.targetRtp
): ReelSuperWeights {
  return adjustWeightsForRTP(weights, SUPER_PAYOUT_TABLE, targetRTP) as ReelSuperWeights;
}

export function adjustRegularWeightsForRTP(
  weights: ReelRegularWeights,
  targetRTP: number = config.rtp.targetRtp
): ReelRegularWeights {
  return adjustWeightsForRTP(weights, REGULAR_PAYOUT_TABLE, targetRTP) as ReelRegularWeights;
}


export function adjustAllSuperWeightsForRTP(
  weightsArray: ReelSuperWeights[],
  targetRTP: number = config.rtp.targetRtp
): ReelSuperWeights[] {
  return weightsArray.map(weights => adjustSuperWeightsForRTP(weights, targetRTP));
}

export function adjustAllRegularWeightsForRTP(
  weightsArray: ReelRegularWeights[],
  targetRTP: number = config.rtp.targetRtp
): ReelRegularWeights[] {
  return weightsArray.map(weights => adjustRegularWeightsForRTP(weights, targetRTP));
}