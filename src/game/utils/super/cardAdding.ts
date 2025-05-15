import { SUPER_MODE_COST } from "../../../constants/game/const/costs.const";
import { WheelElement } from "../../../constants/game/const/wheel-element.const";
import { SuperWheelElement } from "../../../constants/game/super-wheel.enum";

export function cardAdding(elements: WheelElement[][], mode: number) {
  const middleRowIndex = Math.floor(elements.length / 2);

  if (elements.length > 0) {
    const middleElement = elements[middleRowIndex][Math.floor(elements[middleRowIndex].length / 2)];
    if (middleElement === SuperWheelElement.CARD) {
      return SUPER_MODE_COST[mode - 1] / 4;
    }
  }

  return 0;
}
