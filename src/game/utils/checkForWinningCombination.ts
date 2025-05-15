import { ICombination } from "../../constants/game/combination.interface";
import { BASE_POINT_PULL } from "../../constants/game/const/base-point-pull.const";
import { WheelElement } from "../../constants/game/const/wheel-element.const";
import { GameMode } from "../../constants/game/game-mode.enum";
import { Mode } from "../../constants/game/mode.type";
import { RegularWheelElement } from "../../constants/game/regular-wheel.enum";
import { SuperWheelElement } from "../../constants/game/super-wheel.enum";
import { calculateWinAmount } from "./calculateWinAmount";
import { checkLineForCombinationWithDouble } from "./super/checkLineForCombinationWithDouble";
import { pickRandom } from "./super/pickRandom";

export function checkForWinningCombination(
  elements: WheelElement[][],
  options: {
    gameMode: GameMode;
    mode: Mode;
    combinations: ICombination[];
    lines?: number[][];
  },
): {
  baseWin: number;
  baseSecondChance: {
    canFormCombination: boolean;
    missingWheelIndex: number;
    win: number;
  };
  winLines: { line: number[]; amount: number; isRandomizeElements?: boolean }[];
} {
  let baseWin = 0;
  const bestRegularSecondChance = { win: 0, missingIndex: -1 };
  const winLines: {
    line: number[];
    amount: number;
    isRandomizeElements?: boolean;
  }[] = [];

  const defaultLines = [[1, 1, 1]];
  const linesToCheck = options.lines ? options.lines : defaultLines;

  for (const line of linesToCheck) {
    const lineElements: (WheelElement | WheelElement[])[] = line.map((rowIndex, wheelIndex) => elements[wheelIndex][rowIndex] as WheelElement | WheelElement[]);

    for (const combination of options.combinations) {
      if (combination.code.includes(RegularWheelElement.JOKER.repeat(3))) continue;

      const { satisfied, matches } = checkLineForCombinationWithDouble(lineElements, combination);

      if (satisfied) {
        const isSuperOrange = options.gameMode === "super" && combination.code === `${SuperWheelElement.ORANGE}_${SuperWheelElement.ORANGE}_${SuperWheelElement.ORANGE}`;

        const winAmount = isSuperOrange
          ? pickRandom({
              values: BASE_POINT_PULL,
              min: calculateWinAmount(combination, options.mode),
            })
          : calculateWinAmount(combination, options.mode);

        baseWin = Math.max(baseWin, winAmount);
        winLines.push({
          line: [...line],
          amount: winAmount,
          ...(isSuperOrange ? { isRandomizeElements: true } : {}),
        });
      } else if (matches === 2 && !combination.code.includes(RegularWheelElement.ANY)) {
        let missingIndex = -1;
        for (let i = 0; i < lineElements.length; i++) {
          const expected = combination.code.split("_")[i];
          const currentElement = lineElements[i];
          let matched = false;
          if (Array.isArray(currentElement)) {
            matched = currentElement.includes(expected as WheelElement);
          } else if (currentElement === expected) {
            matched = true;
          }
          if (expected !== RegularWheelElement.ANY && !matched) {
            missingIndex = i;
            break;
          }
        }

        if (missingIndex !== -1) {
          const potentialWin = calculateWinAmount(combination, options.mode);
          if (potentialWin > bestRegularSecondChance.win) {
            bestRegularSecondChance.win = potentialWin;
            bestRegularSecondChance.missingIndex = missingIndex;
          }
        }
      }
    }
  }

  return {
    baseWin,
    baseSecondChance: {
      canFormCombination: bestRegularSecondChance.win > 0,
      missingWheelIndex: bestRegularSecondChance.missingIndex,
      win: bestRegularSecondChance.win,
    },
    winLines,
  };
}
