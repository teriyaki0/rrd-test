import { RegularWheelElement } from "../../constants/game/regular-wheel.enum";

export const REGULAR_WEIGHTS_ONE: Record<RegularWheelElement, number> = {
  [RegularWheelElement.CHERRY]: 20,
  [RegularWheelElement.LEMON]: 20,
  [RegularWheelElement.ORANGE]: 10,
  [RegularWheelElement.PLUM]: 25,
  [RegularWheelElement.PEAR]: 10,
  [RegularWheelElement.GRAPE]: 5,
  [RegularWheelElement.WATERMELON]: 5,
  [RegularWheelElement.BELL]: 3,
  [RegularWheelElement.KING]: 1,
  [RegularWheelElement.JOKER]: 1,
  [RegularWheelElement.BAR]: 0, 
  [RegularWheelElement.ANY]: 0,
};

export const REGULAR_WEIGHTS_TWO: Record<RegularWheelElement, number> = {
  [RegularWheelElement.CHERRY]: 50,
  [RegularWheelElement.LEMON]: 15,
  [RegularWheelElement.ORANGE]: 10,
  [RegularWheelElement.PLUM]: 8,
  [RegularWheelElement.PEAR]: 7,
  [RegularWheelElement.GRAPE]: 5,
  [RegularWheelElement.WATERMELON]: 3,
  [RegularWheelElement.BELL]: 1,
  [RegularWheelElement.KING]: 1,
  [RegularWheelElement.JOKER]: 0,
  [RegularWheelElement.BAR]: 0, 
  [RegularWheelElement.ANY]: 0,
};

export const REGULAR_WEIGHTS_THREE: Record<RegularWheelElement, number> = {
  [RegularWheelElement.CHERRY]: 50,
  [RegularWheelElement.LEMON]: 25,
  [RegularWheelElement.ORANGE]: 10,
  [RegularWheelElement.PLUM]: 5,
  [RegularWheelElement.PEAR]: 5,
  [RegularWheelElement.GRAPE]: 3,
  [RegularWheelElement.WATERMELON]: 1,
  [RegularWheelElement.BELL]: 1,
  [RegularWheelElement.KING]: 0,
  [RegularWheelElement.JOKER]: 0,
  [RegularWheelElement.BAR]: 0, 
  [RegularWheelElement.ANY]: 0,
};

export const REGULAR_WEIGHTS_ALL = [
  REGULAR_WEIGHTS_ONE,
  REGULAR_WEIGHTS_TWO,
  REGULAR_WEIGHTS_THREE,
];

export type ReelRegularWeights = Record<RegularWheelElement, number>;
