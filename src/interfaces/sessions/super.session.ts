import { Mode } from "../../constants/game/mode.type";
import { SuperWheel } from "../../constants/game/super-wheel.enum";

export interface SuperGame {
  mode: Mode;
  elements: SuperWheel[];
  winAmount: number;
  combination: number[];
  beSecondChance: boolean;
}
