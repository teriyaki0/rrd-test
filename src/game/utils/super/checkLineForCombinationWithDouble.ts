import { ICombination } from "../../../constants/game/combination.interface";
import { RegularWheelElement } from "../../../constants/game/regular-wheel.enum";
import { WheelElement } from "../../../constants/game/const/wheel-element.const";

export function checkLineForCombinationWithDouble(lineElements: (WheelElement | WheelElement[])[], combination: ICombination): { satisfied: boolean; matches: number } {
  const patternParts = combination.code.split("_");
  if (patternParts.length !== lineElements.length) {
    return { satisfied: false, matches: 0 };
  }

  let satisfied = true;
  let matches = 0;

  for (let i = 0; i < lineElements.length; i++) {
    const expected = patternParts[i];
    if (expected === RegularWheelElement.ANY) {
      matches++;
      continue;
    }

    const currentElement = lineElements[i];
    let elementMatched = false;

    if (Array.isArray(currentElement)) {
      elementMatched = (currentElement as WheelElement[]).includes(expected as WheelElement);
    } else if (currentElement === expected) {
      elementMatched = true;
    }

    if (elementMatched) {
      matches++;
    } else {
      satisfied = false;
    }
  }

  return { satisfied, matches };
}
