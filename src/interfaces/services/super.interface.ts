import { ISuperSpinResult } from "../../game/superSpin";
import { SuperGame } from "../sessions/super.session";

export interface ISuperService {
  spin({
    tgId,
    mode,
    combination,
    superGame,
    doubleGameActive,
  }: {
    tgId: string;
    mode: number;
    combination: number[];
    superGame: SuperGame;
    doubleGameActive: boolean;
  }): Promise<ISuperSpinResult>;
  getCards({ tgId }: { tgId: string }): Promise<{ winAmount: number; isEleven: boolean }>;
}
