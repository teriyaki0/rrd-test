import { REGULAR_COMBINATION } from "../../../constants/game/const/regular-combination.const";
import { Mode } from "../../../constants/game/mode.type";
import { RegularWheelElement } from "../../../constants/game/regular-wheel.enum";
import { calculateWinAmount } from "../calculateWinAmount";

export function checkJokerCombination(
  elements: string[][],
  mode: Mode,
): {
  jokerWin: number;
  jokerSecondChance: {
    canFormCombination: boolean;
    missingWheelIndex: number;
  };
  jokerWinLines: {
    line: number[];
    amount: number;
    isRandomizeElements?: boolean;
  }[];
} {
  let jokerWin = 0;
  let jokerCanForm = false;
  let jokerMissingIndex = -1;
  let winLines: {
    line: number[];
    amount: number;
    isRandomizeElements?: boolean;
  }[] = [];

  const jokerCombination = REGULAR_COMBINATION.find((c) => c.code === `${RegularWheelElement.JOKER}_${RegularWheelElement.JOKER}_${RegularWheelElement.JOKER}`);

  if (!jokerCombination) {
    return {
      jokerWin: 0,
      jokerSecondChance: {
        canFormCombination: false,
        missingWheelIndex: -1,
      },
      jokerWinLines: [],
    };
  }

  const allHaveJoker = elements.every((reel) => reel.includes(RegularWheelElement.JOKER));

  if (allHaveJoker) {
    jokerWin = calculateWinAmount(jokerCombination, mode);
    winLines = [{ line: [1, 1, 1], amount: jokerWin }];
  } else {
    const jokerReelsCount = elements.filter((reel) => reel.includes(RegularWheelElement.JOKER)).length;

    if (jokerReelsCount === 2) {
      jokerCanForm = true;
      for (let i = 0; i < elements.length; i++) {
        if (!elements[i].includes(RegularWheelElement.JOKER)) {
          jokerMissingIndex = i;
          break;
        }
      }
    }
  }

  return {
    jokerWin,
    jokerSecondChance: {
      canFormCombination: jokerCanForm,
      missingWheelIndex: jokerMissingIndex,
    },
    jokerWinLines: winLines,
  };
}
