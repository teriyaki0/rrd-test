import { SUPER_COMBINATION } from "../constants/game/const/super-combination.const";
import { SUPER_WHEELS } from "../constants/game/const/super-wheels.const";
import { WheelElement } from "../constants/game/const/wheel-element.const";
import { GameMode } from "../constants/game/game-mode.enum";
import { SuperWheelElement } from "../constants/game/super-wheel.enum";
import { SuperGame } from "../interfaces/sessions/super.session";
import { adjustWeights } from "./utils/adjustWeights";
import { checkForWinningCombination } from "./utils/checkForWinningCombination";
import { getContinueCombination } from "./utils/getContinueCombination";
import { getVisibleElements } from "./utils/getVisibleElements";
import { getWheelIndex } from "./utils/getWheelIndex";
import { mapModeToMultiplier } from "./utils/mapModeToMultiplier";
import { cardAdding } from "./utils/super/cardAdding";
import { SUPER_WEIGHTS_ALL, SUPER_WEIGHTS_ONE } from "./weight/super-weight.";

export interface ISuperSpinResult {
  results: number[];
  elements: WheelElement[][];
  winAmount: number;
  winLines: any;
  beSecondChance: boolean;
  indexContinue: number[];
  cards: number;
}

export function superSpin(mode: number, combination: number[], superGame: SuperGame): ISuperSpinResult {
  const currentMode = mapModeToMultiplier(mode);

  const weightSet = SUPER_WEIGHTS_ALL.map((wheelWeights) => 
    adjustWeights(currentMode, wheelWeights)
  );

  if (superGame?.beSecondChance || superGame?.winAmount > 0 || superGame?.carding) {
    combination = [1, 1, 1];
  }


  const results: number[] = [];
  const elements: WheelElement[][] = [];

  for (let i = 0; i < SUPER_WHEELS.length; i++) {
    const wheel = SUPER_WHEELS[i] as SuperWheelElement[];
    const wheelWeight = weightSet[i];

    let centerIndex: number;

    if (combination[i] === 1) {
      centerIndex = getWheelIndex(wheel, wheelWeight);
    } else {
      centerIndex = superGame.combination[i];
    }

    results.push(centerIndex);
    elements.push(getVisibleElements(wheel, centerIndex));
  }

  const { baseSecondChance, winLines } = checkForWinningCombination(elements, {
    mode: currentMode,
    gameMode: GameMode.SUPER,
    combinations: SUPER_COMBINATION,
    lines: [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [0, 1, 2],
      [2, 1, 0],
    ],
  });

  const cards = cardAdding(elements, mode);

  const totalWinAmount = winLines.reduce((sum, lineInfo) => sum + (lineInfo.amount || 0), 0);

  return {
    results,
    winAmount: totalWinAmount,
    elements,
    beSecondChance: combination.some((v) => v !== 1),
    indexContinue: cards > 0 ? [1, 1, 1] : getContinueCombination(baseSecondChance.missingWheelIndex),
    winLines,
    cards,
  };
}
