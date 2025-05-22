import { config } from "../../config";
import { logger } from "../../libs/logger";
import { ReelRegularWeights } from "../weight/regular-weight.";
import { ReelSuperWeights } from "../weight/super-weight.";
import { calculateSingleReelRTP, SUPER_PAYOUT_TABLE, REGULAR_PAYOUT_TABLE } from "./rtp-calculator";

export function adjustWeightsForRTP<T extends string>(
  weights: Record<T, number>,
  payoutTable: Record<string, number>,
  targetRTP: number
): Record<T, number> {
  // Преобразуем целевой RTP в проценты, если он задан в дробном формате
  const targetRTPPercent = targetRTP <= 1 ? targetRTP * 100 : targetRTP;

  logger.info(`Корректировка весов с целевым RTP: ${targetRTP} (${targetRTPPercent}%)`);

  const adjustedWeights: Record<T, number> = { ...weights };

  const totalWeight = (Object.values(weights) as number[]).reduce((sum, weight) => sum + weight, 0);
  if (totalWeight > 0) {
    for (const key in adjustedWeights) {
      adjustedWeights[key as T] = (adjustedWeights[key as T] / totalWeight) * 100;
    }
  }

  const currentRTP = calculateSingleReelRTP(adjustedWeights, payoutTable);
  logger.info(`Текущий RTP с исходными весами: ${currentRTP.toFixed(2)}%`);

  if (Math.abs(currentRTP - targetRTPPercent) < 0.1) {
    logger.info(`Текущий RTP (${currentRTP.toFixed(2)}%) уже близок к целевому (${targetRTPPercent}%), корректировка не требуется`);
    return adjustedWeights;
  }

  const sortedSymbols = Object.keys(payoutTable)
    .filter(symbol => adjustedWeights[symbol as T] !== undefined && payoutTable[symbol] > 0)
    .sort((a, b) => (payoutTable[b] || 0) - (payoutTable[a] || 0));

  // ВАЖНОЕ ИЗМЕНЕНИЕ: Инвертируем логику
  // Если нужно увеличить RTP, увеличиваем веса высокооплачиваемых символов
  // Если нужно уменьшить RTP, увеличиваем веса низкооплачиваемых символов
  const needToIncreaseRTP = currentRTP < targetRTPPercent;
  logger.info(`Необходимо ${needToIncreaseRTP ? 'увеличить' : 'уменьшить'} RTP`);

  let iterations = 0;
  const maxIterations = 50;

  while (Math.abs(calculateSingleReelRTP(adjustedWeights, payoutTable) - targetRTPPercent) > 0.1 && 
         iterations < maxIterations) {

    const highPaySymbols = sortedSymbols.slice(0, Math.ceil(sortedSymbols.length / 3));
    const lowPaySymbols = sortedSymbols.slice(-Math.ceil(sortedSymbols.length / 3));

    // ИЗМЕНЕНИЕ: Инвертируем логику корректировки
    if (needToIncreaseRTP) {
      // Для увеличения RTP увеличиваем веса высокооплачиваемых символов
      for (const symbol of highPaySymbols) {
        adjustedWeights[symbol as T] *= 1.05; // Увеличиваем на 5%
      }

      for (const symbol of lowPaySymbols) {
        adjustedWeights[symbol as T] = Math.max(adjustedWeights[symbol as T] * 0.95, 1); 
      }
    } else {
      for (const symbol of highPaySymbols) {
        adjustedWeights[symbol as T] = Math.max(adjustedWeights[symbol as T] * 0.95, 1);
      }

      for (const symbol of lowPaySymbols) {
        adjustedWeights[symbol as T] *= 1.05;
      }
    }

    const newTotalWeight = (Object.values(adjustedWeights) as number[]).reduce((sum, weight) => sum + weight, 0);
    for (const key in adjustedWeights) {
      adjustedWeights[key as T] = (adjustedWeights[key as T] / newTotalWeight) * 100;
    }

    iterations++;
  }

  for (const symbol in adjustedWeights) {
    adjustedWeights[symbol as T] = Math.max(Math.round(adjustedWeights[symbol as T]), 0);
  }

  let finalSum = (Object.values(adjustedWeights) as number[]).reduce((sum, weight) => sum + weight, 0);
  if (finalSum !== 100) {
    const maxWeightSymbol = Object.keys(adjustedWeights).reduce((a, b) => 
      adjustedWeights[a as T] > adjustedWeights[b as T] ? a : b
    ) as T;

    adjustedWeights[maxWeightSymbol] += (100 - finalSum);
  }

  const finalRTP = calculateSingleReelRTP(adjustedWeights, payoutTable);
  logger.info(`Итоговый RTP после корректировки: ${finalRTP.toFixed(2)}%`);

  return adjustedWeights;
}
export function adjustSuperWeightsForRTP(
  weights: ReelSuperWeights,
  targetRTP: number = config.rtp.targetRtp
): ReelSuperWeights {
  const weight = adjustWeightsForRTP(weights, SUPER_PAYOUT_TABLE, targetRTP) as ReelSuperWeights;
  logger.info(weight)
  return weight
}

export function adjustRegularWeightsForRTP(
  weights: ReelRegularWeights,
  targetRTP: number = config.rtp.targetRtp
): ReelRegularWeights {
  const weight = adjustWeightsForRTP(weights, REGULAR_PAYOUT_TABLE, targetRTP) as ReelRegularWeights;
  logger.info(weight)
  return weight
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