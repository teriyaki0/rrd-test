import { ISuperService } from "../interfaces/services/super.interface";
import { SuperGame } from "../interfaces/sessions/super.session";

export class SuperService implements ISuperService {
  spin({ tgId, mode, combination, superGame }: { tgId: string; mode: number; combination: number[]; superGame: SuperGame }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
