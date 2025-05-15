import { IRegularSpinResult } from "../../game/regularSpin";
import { RegularGame } from "../sessions/regular.session";

export interface IRegularService {
  spin({
    tgId,
    mode,
    combination,
    regularGame,
    doubleGameActive,
  }: {
    tgId: string;
    mode: number;
    combination: number[];
    regularGame: RegularGame;
    doubleGameActive: boolean;
  }): Promise<IRegularSpinResult>;
}
