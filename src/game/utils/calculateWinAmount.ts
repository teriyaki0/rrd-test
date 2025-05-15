import { Mode } from "fs";

import { ICombination } from "../../constants/game/combination.interface";

export function calculateWinAmount(combination: ICombination, currentMode: Mode): number {
  switch (currentMode) {
    case "x1":
      return combination.one;
    case "x2":
      return combination.two;
    case "x3":
      return combination.three ?? combination.two ?? combination.one;
    default:
      return combination.one;
  }
}
