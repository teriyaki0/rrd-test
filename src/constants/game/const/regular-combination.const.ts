import { ICombination } from "../combination.interface";
import { RegularWheelElement } from "../regular-wheel.enum";

export const REGULAR_COMBINATION: ICombination[] = [
  {
    code: `${RegularWheelElement.JOKER}_${RegularWheelElement.JOKER}_${RegularWheelElement.JOKER}`,
    one: 20,
    two: 40,
  },
  {
    code: `${RegularWheelElement.KING}_${RegularWheelElement.KING}_${RegularWheelElement.KING}`,
    one: 80,
    two: 200,
  },
  {
    code: `${RegularWheelElement.BELL}_${RegularWheelElement.BELL}_${RegularWheelElement.BELL}`,
    one: 80,
    two: 200,
  },
  {
    code: `${RegularWheelElement.WATERMELON}_${RegularWheelElement.WATERMELON}_${RegularWheelElement.WATERMELON}`,
    one: 40,
    two: 80,
  },
  {
    code: `${RegularWheelElement.GRAPE}_${RegularWheelElement.GRAPE}_${RegularWheelElement.GRAPE}`,
    one: 20,
    two: 40,
  },
  {
    code: `${RegularWheelElement.PLUM}_${RegularWheelElement.PLUM}_${RegularWheelElement.PLUM}`,
    one: 16,
    two: 32,
  },
  {
    code: `${RegularWheelElement.PLUM}_${RegularWheelElement.PLUM}_${RegularWheelElement.BAR}`,
    one: 16,
    two: 32,
  },
  {
    code: `${RegularWheelElement.PEAR}_${RegularWheelElement.PEAR}_${RegularWheelElement.PEAR}`,
    one: 20,
    two: 40,
  },
  {
    code: `${RegularWheelElement.PEAR}_${RegularWheelElement.PEAR}_${RegularWheelElement.BAR}`,
    one: 16,
    two: 32,
  },

  {
    code: `${RegularWheelElement.ORANGE}_${RegularWheelElement.ORANGE}_${RegularWheelElement.ORANGE}`,
    one: 12,
    two: 24,
  },
  {
    code: `${RegularWheelElement.ORANGE}_${RegularWheelElement.ORANGE}_${RegularWheelElement.BAR}`,
    one: 12,
    two: 24,
  },
  {
    code: `${RegularWheelElement.LEMON}_${RegularWheelElement.LEMON}_${RegularWheelElement.LEMON}`,
    one: 12,
    two: 24,
  },
  {
    code: `${RegularWheelElement.LEMON}_${RegularWheelElement.LEMON}_${RegularWheelElement.BAR}`,
    one: 8,
    two: 16,
  },
  {
    code: `${RegularWheelElement.CHERRY}_${RegularWheelElement.CHERRY}_${RegularWheelElement.CHERRY}`,
    one: 8,
    two: 16,
  },
  {
    code: `${RegularWheelElement.CHERRY}_${RegularWheelElement.CHERRY}_${RegularWheelElement.BAR}`,
    one: 8,
    two: 16,
  },
  {
    code: `${RegularWheelElement.CHERRY}_${RegularWheelElement.CHERRY}_${RegularWheelElement.ANY}`,
    one: 4,
    two: 8,
  },
  {
    code: `${RegularWheelElement.CHERRY}_${RegularWheelElement.ANY}_${RegularWheelElement.ANY}`,
    one: 2,
    two: 4,
  },
];
