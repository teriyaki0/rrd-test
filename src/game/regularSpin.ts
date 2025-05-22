import { REGULAR_COMBINATION } from "../constants/game/const/regular-combination.const";
import { REGULAR_WHEELS } from "../constants/game/const/regular-wheels.const";
import { WheelElement } from "../constants/game/const/wheel-element.const";
import { GameMode } from "../constants/game/game-mode.enum";
import { RegularGame } from "../interfaces/sessions/regular.session";
import { adjustWeights } from "./utils/adjustWeights";
import { checkForWinningCombination } from "./utils/checkForWinningCombination";
import { getContinueCombination } from "./utils/getContinueCombination";
import { getVisibleElements } from "./utils/getVisibleElements";
import { getWheelIndex } from "./utils/getWheelIndex";
import { mapModeToMultiplier } from "./utils/mapModeToMultiplier";
import { checkJokerCombination } from "./utils/regular/checkJokerCombination";
import { chooseBestSecondChance } from "./utils/regular/chooseBestSecondChance";
import { REGULAR_WEIGHTS_ALL } from "./weight/regular-weight.";

export interface IRegularSpinResult {
  results: number[];
  elements: WheelElement[][];
  winAmount: number;
  winLines: any;
  beSecondChance: boolean;
  indexContinue: number[];
}

export function regularSpin(mode: number, combination: number[], regularGame: RegularGame): IRegularSpinResult {
  const currentMode = mapModeToMultiplier(mode);

  const weightSet = REGULAR_WEIGHTS_ALL.map((wheelWeights) => 
    adjustWeights(currentMode, wheelWeights)
  );
  
  if (regularGame.beSecondChance || regularGame.winAmount > 0) {
    combination = [1, 1, 1];
  }

  const results: number[] = [];
  const elements: WheelElement[][] = [];

  for (let i = 0; i < REGULAR_WHEELS.length; i++) {
    const wheel = REGULAR_WHEELS[i];
    const wheelWeight = weightSet[i];
    
    let centerIndex: number;

    if (combination[i] === 1) {
      centerIndex = getWheelIndex(wheel, wheelWeight);
    } else {
      centerIndex = regularGame.combination[i];
    }

    results.push(centerIndex);
    elements.push(getVisibleElements(wheel, centerIndex) as WheelElement[]);
  }


  const { baseWin, baseSecondChance, winLines } = checkForWinningCombination(elements, {
    mode: currentMode,
    gameMode: GameMode.REGULAR,
    combinations: REGULAR_COMBINATION,
  });

  const { jokerWin, jokerSecondChance, jokerWinLines } = checkJokerCombination(elements, currentMode);

  const handleSecondChance = chooseBestSecondChance(baseSecondChance, jokerSecondChance, currentMode);

  let missingIndex = -1;

  if (handleSecondChance) {
    missingIndex = handleSecondChance === GameMode.REGULAR ? baseSecondChance.missingWheelIndex : jokerSecondChance.missingWheelIndex;
  }

  const winAmount = Math.max(baseWin, jokerWin);
  let winLinesCore: { line: number[]; amount: number }[] = [];

  if (winAmount > 0) {
    if (jokerWin > baseWin) {
      winLinesCore = jokerWinLines;
    } else if (baseWin > jokerWin) {
      winLinesCore = winLines;
    } else if (baseWin > 0) {
      winLinesCore = winLines;
    }
  }

  return {
    results,
    winAmount,
    elements,
    beSecondChance: combination.some((v) => v !== 1),
    indexContinue: getContinueCombination(missingIndex),
    winLines: winLinesCore,
  };
}
