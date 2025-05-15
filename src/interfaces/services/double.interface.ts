import { AppSession } from "../express";
import { DoubleGame } from "../sessions/double.session";

export interface IDoubleService {
  start({ tgId, mode, appSession }: { tgId: string; mode: string; appSession: AppSession }): Promise<void>;
  play({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<void>;
  cashOut({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<void>;
  half({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<void>;
}
