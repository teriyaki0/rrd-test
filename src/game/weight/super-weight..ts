import { SuperWheelElement } from "../../constants/game/super-wheel.enum";

export const SUPER_WEIGHTS_ONE: Record<SuperWheelElement, number> = {
  [SuperWheelElement.ORANGE]: 25,
  [SuperWheelElement.PLUM]: 20,
  [SuperWheelElement.PEAR]: 15,
  [SuperWheelElement.STRAWBERRY]: 10,
  [SuperWheelElement.GRAPE]: 10,
  [SuperWheelElement.WATERMELON]: 10,
  [SuperWheelElement.BELL]: 5,
  [SuperWheelElement.SEVEN]: 3,
  [SuperWheelElement.KING]: 2,
  [SuperWheelElement.CARD]: 0,
};

export const SUPER_WEIGHTS_TWO: Record<SuperWheelElement, number> = {
  [SuperWheelElement.ORANGE]: 10,
  [SuperWheelElement.PLUM]: 15,
  [SuperWheelElement.PEAR]: 25,
  [SuperWheelElement.STRAWBERRY]: 20,
  [SuperWheelElement.GRAPE]: 5,
  [SuperWheelElement.WATERMELON]: 10,
  [SuperWheelElement.BELL]: 7,
  [SuperWheelElement.SEVEN]: 2,
  [SuperWheelElement.KING]: 1,
  [SuperWheelElement.CARD]: 5,
};

export const SUPER_WEIGHTS_THREE: Record<SuperWheelElement, number> = {
  [SuperWheelElement.ORANGE]: 5,
  [SuperWheelElement.PLUM]: 10,
  [SuperWheelElement.PEAR]: 10,
  [SuperWheelElement.STRAWBERRY]: 25,
  [SuperWheelElement.GRAPE]: 20,
  [SuperWheelElement.WATERMELON]: 15,
  [SuperWheelElement.BELL]: 5,
  [SuperWheelElement.SEVEN]: 5,
  [SuperWheelElement.KING]: 5,
  [SuperWheelElement.CARD]: 0,
};

export const SUPER_WEIGHTS_ALL = [
  SUPER_WEIGHTS_ONE,
  SUPER_WEIGHTS_TWO,
  SUPER_WEIGHTS_THREE,
];

export type ReelSuperWeights = Record<SuperWheelElement, number>;
