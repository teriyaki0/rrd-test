import { ICombination } from "../combination.interface";
import { SuperWheelElement } from "../super-wheel.enum";

export const SUPER_COMBINATION: ICombination[] = [
  {
    code: `${SuperWheelElement.KING}_${SuperWheelElement.KING}_${SuperWheelElement.KING}`,
    one: 200,
    two: 500,
    three: 1000,
  },
  {
    code: `${SuperWheelElement.SEVEN}_${SuperWheelElement.SEVEN}_${SuperWheelElement.SEVEN}`,
    one: 120,
    two: 250,
    three: 600,
  },
  {
    code: `${SuperWheelElement.BELL}_${SuperWheelElement.BELL}_${SuperWheelElement.BELL}`,
    one: 100,
    two: 220,
    three: 450,
  },
  {
    code: `${SuperWheelElement.WATERMELON}_${SuperWheelElement.WATERMELON}_${SuperWheelElement.WATERMELON}`,
    one: 64,
    two: 160,
    three: 340,
  },
  {
    code: `${SuperWheelElement.GRAPE}_${SuperWheelElement.GRAPE}_${SuperWheelElement.GRAPE}`,
    one: 48,
    two: 120,
    three: 260,
  },
  {
    code: `${SuperWheelElement.STRAWBERRY}_${SuperWheelElement.STRAWBERRY}_${SuperWheelElement.STRAWBERRY}`,
    one: 24,
    two: 48,
    three: 100,
  },
  {
    code: `${SuperWheelElement.PEAR}_${SuperWheelElement.PEAR}_${SuperWheelElement.PEAR}`,
    one: 20,
    two: 40,
    three: 80,
  },
  {
    code: `${SuperWheelElement.PLUM}_${SuperWheelElement.PLUM}_${SuperWheelElement.PLUM}`,
    one: 16,
    two: 32,
    three: 64,
  },
  {
    code: `${SuperWheelElement.ORANGE}_${SuperWheelElement.ORANGE}_${SuperWheelElement.ORANGE}`,
    one: 8,
    two: 16,
    three: 32,
  },
];
