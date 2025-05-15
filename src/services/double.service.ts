import { AppSession } from "../interfaces/express";
import { IDoubleService } from "../interfaces/services/double.interface";
import { DoubleGame } from "../interfaces/sessions/double.session";

export class DoubleService implements IDoubleService {
  start({ tgId, mode, appSession }: { tgId: string; mode: string; appSession: AppSession }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  play({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  cashOut({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  half({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async finalizeDouble(): Promise<void> {}
}
