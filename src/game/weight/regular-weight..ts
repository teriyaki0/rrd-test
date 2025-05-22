import { config } from "../../config";
import { RegularWheelElement } from "../../constants/game/regular-wheel.enum";
import { adjustRegularWeightsForRTP } from "../utils/weight-adjuster";

const BASE_WEIGHTS_ONE: ReelRegularWeights = {
  [RegularWheelElement.CHERRY]: 20,
  [RegularWheelElement.LEMON]: 20,
  [RegularWheelElement.ORANGE]: 10,
  [RegularWheelElement.PLUM]: 16,
  [RegularWheelElement.PEAR]: 10,
  [RegularWheelElement.GRAPE]: 5,
  [RegularWheelElement.WATERMELON]: 5,
  [RegularWheelElement.BELL]: 3,
  [RegularWheelElement.KING]: 5,
  [RegularWheelElement.JOKER]: 1,
  [RegularWheelElement.BAR]: 5, 
  [RegularWheelElement.ANY]: 0,
};

const BASE_WEIGHTS_TWO: ReelRegularWeights = {
  [RegularWheelElement.CHERRY]: 43,
  [RegularWheelElement.LEMON]: 15,
  [RegularWheelElement.ORANGE]: 10,
  [RegularWheelElement.PLUM]: 8,
  [RegularWheelElement.PEAR]: 7,
  [RegularWheelElement.GRAPE]: 5,
  [RegularWheelElement.WATERMELON]: 3,
  [RegularWheelElement.BELL]: 1,
  [RegularWheelElement.KING]: 4,
  [RegularWheelElement.JOKER]: 2,
  [RegularWheelElement.BAR]: 3, 
  [RegularWheelElement.ANY]: 0,
};

const BASE_WEIGHTS_THREE: ReelRegularWeights = {
  [RegularWheelElement.CHERRY]: 30,
  [RegularWheelElement.LEMON]: 25,
  [RegularWheelElement.ORANGE]: 10,
  [RegularWheelElement.PLUM]: 5,
  [RegularWheelElement.PEAR]: 5,
  [RegularWheelElement.GRAPE]: 3,
  [RegularWheelElement.WATERMELON]: 1,
  [RegularWheelElement.BELL]: 1,
  [RegularWheelElement.KING]: 15,
  [RegularWheelElement.JOKER]: 3,
  [RegularWheelElement.BAR]: 2, 
  [RegularWheelElement.ANY]: 0,
};

export const REGULAR_WEIGHTS_ONE = adjustRegularWeightsForRTP(BASE_WEIGHTS_ONE, config.rtp.targetRtp);
export const REGULAR_WEIGHTS_TWO = adjustRegularWeightsForRTP(BASE_WEIGHTS_TWO, config.rtp.targetRtp);
export const REGULAR_WEIGHTS_THREE = adjustRegularWeightsForRTP(BASE_WEIGHTS_THREE, config.rtp.targetRtp);

export const REGULAR_WEIGHTS_ALL = [
  REGULAR_WEIGHTS_ONE,
  REGULAR_WEIGHTS_TWO,
  REGULAR_WEIGHTS_THREE,
];

export type ReelRegularWeights = Record<RegularWheelElement, number>;
