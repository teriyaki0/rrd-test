import { REGULAR_COMBINATION } from "../../../constants/game/const/regular-combination.const";
import { Mode } from "../../../constants/game/mode.type";
import { RegularWheelElement } from "../../../constants/game/regular-wheel.enum";
import { calculateWinAmount } from "../calculateWinAmount";

export const chooseBestSecondChance = (
  regularSecondChance: {
    canFormCombination: any;
    missingWheelIndex?: number;
    win: any;
  },
  jokerSecondChance: { canFormCombination: any; missingWheelIndex?: number },
  currentMode: Mode,
) => {
  const jokerCombination = REGULAR_COMBINATION.find((c) => c.code === `${RegularWheelElement.JOKER}_${RegularWheelElement.JOKER}_${RegularWheelElement.JOKER}`);
  const jokerWinPotential = jokerCombination ? calculateWinAmount(jokerCombination, currentMode) : 0;
  const regularWinPotential = regularSecondChance.win;

  let handleSecondChance: "regular" | "joker" | null = null;

  if (regularSecondChance.canFormCombination || jokerSecondChance.canFormCombination) {
    const regularValue = regularSecondChance.canFormCombination ? regularWinPotential : 0;
    const jokerValue = jokerSecondChance.canFormCombination ? jokerWinPotential : 0;

    if (regularValue > jokerValue) {
      handleSecondChance = "regular";
    } else if (jokerValue > regularValue) {
      handleSecondChance = "joker";
    } else {
      if (jokerSecondChance.canFormCombination) {
        handleSecondChance = "joker";
      } else if (regularSecondChance.canFormCombination) {
        handleSecondChance = "regular";
      }
    }
  }

  return handleSecondChance;
};
