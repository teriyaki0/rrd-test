import { RegularWheelElement } from "../regular-wheel.enum";

export const REGULAR_WEIGHTS: Record<RegularWheelElement, number> = {
  [RegularWheelElement.CHERRY]: 1,
  [RegularWheelElement.LEMON]: 10,
  [RegularWheelElement.ORANGE]: 11,
  [RegularWheelElement.PLUM]: 5,
  [RegularWheelElement.PEAR]: 5,
  [RegularWheelElement.GRAPE]: 8,
  [RegularWheelElement.WATERMELON]: 3,
  [RegularWheelElement.BELL]: 2,
  [RegularWheelElement.KING]: 1,
  [RegularWheelElement.JOKER]: 5,
  [RegularWheelElement.BAR]: 25,
  [RegularWheelElement.ANY]: 0,
};
