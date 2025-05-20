import { WheelElement } from "../../constants/game/const/wheel-element.const";
import { Mode } from "../../constants/game/mode.type";

export interface RegularGame {
  mode: Mode;
  elements: WheelElement[][];
  winAmount: number;
  combination: number[];
  beSecondChance: boolean;
}
