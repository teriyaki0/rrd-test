import { AppSession } from "../express";
import { DoubleGame } from "../sessions/double.session";

export interface IDoubleService {
  start({ tgId, mode, appSession }: { tgId: string; mode: string; appSession: AppSession }): Promise<object>;
  play({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<object>;
  cashOut({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<object>;
  half({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<object>;
}
