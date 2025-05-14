import { Mode } from "../../constants/game/mode.type";
import { RegularWheel } from "../../constants/game/regular-wheel.enum";

export interface RegularGame {
  mode: Mode;
  elements: RegularWheel[];
  winAmount: number;
  combination: number[];
  beSecondChance: boolean;
}
